import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {CreatePlayerDto} from '../dto/createPlayer.dto'
import {Player, UserRanking, CustomDeleteResult } from '../interface/player.interface';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';


@Injectable()
export class PlayersService {
    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    async createPlayer(createPlayerDto : CreatePlayerDto):Promise<any> { 
        const playerExists: Player = await this.findOnePlayer(createPlayerDto.email);//search by email if exists active user
        if(playerExists && playerExists.phoneNumber == createPlayerDto.phoneNumber && playerExists.email == createPlayerDto.email) {
            throw new BadRequestException('phone number or email alread exists on database ')
        }
        return await  this.factoryCreatePlayer(createPlayerDto);
    }

    async updatePlayer(id: string, createPlayerDto : CreatePlayerDto):Promise<any> {    
        const playerExists: Player = await this.findOnePlayer(id);
        if(!playerExists) {
            throw new NotFoundException('Player not found')
        }
        return await this.factoryUpdatePlayer(playerExists, createPlayerDto); 
    }

    private async factoryCreatePlayer(createPlayerDto : CreatePlayerDto): Promise<Player> {
        const {name, email, phoneNumber, urlPhoto, login, password} = createPlayerDto;
        const player: CreatePlayerDto = {
            name,
            email,
            phoneNumber,
            urlPhoto,
            login,
            ranking: 'F',
            positionRanking: undefined
        };
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        player.password = hashedPassword;
        const newPlayer = new this.playerModel(player);
        return await newPlayer.save();
    }

    private async factoryUpdatePlayer(playerExists: Player, createPlayerDto : CreatePlayerDto): Promise<Player> {
        const {name, email, phoneNumber, urlPhoto, ranking, positionRanking} = createPlayerDto;
        const playerToUpdate: CreatePlayerDto = {
            name,
            email,
            phoneNumber,
            urlPhoto,
            ranking,
            positionRanking
        };
        const filter: FilterQuery<Player> = { _id: new ObjectId(playerExists._id) };
        return await this.playerModel.findOneAndUpdate(filter, playerToUpdate, { new: true });
    }

    async findAllPlayer():Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async findOnePlayer(identifier: string):Promise<Player> {
        const validEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(identifier);
        const validId= /^[0-9a-fA-F]{24}$/.test(identifier);
        let query;

        if (validEmail) {
            query = { email: identifier };
        } else if (validId) {
            query = { _id: new ObjectId(identifier) };
        } else {
            const nameRegex = new RegExp(identifier, 'i');
            query = { name: { $regex: nameRegex } };
        }
        return await this.playerModel.findOne(query).exec();
    }

    async updateRanking(objRanking: UserRanking) {
        const { _id, ranking, positionRanking } = objRanking;
        const filter: FilterQuery<Player> = { _id: new ObjectId(_id) };
        let update: UpdateQuery<Player> = {};
    
        if (ranking && positionRanking) {
            update = { $set: { ranking, positionRanking } };
        } else if (ranking) {
            update = { $set: { ranking } };
        } else if (positionRanking) {
            update = { $set: { positionRanking } };
        }
        return await this.playerModel.findOneAndUpdate(filter, update, { new: true });
    }

    async deletePlayer(id: string): Promise<CustomDeleteResult> {
        return await this.playerModel.deleteOne({_id: new ObjectId(id)})
    }

}
