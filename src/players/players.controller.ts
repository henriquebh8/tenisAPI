import { Body, Controller, Get, Post, Req, Query, Param, Delete, Put, UsePipes, ValidationPipe, HttpException, HttpStatus, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {CreatePlayerDto} from '../dto/createPlayer.dto'
import {PlayersService} from './players.service'
import {Player, UserRanking, CustomDeleteResult } from '../interface/player.interface';
import { PlayerValidatePipe, PlayerValidatePipeGet } from '../pipes/players-validate.pipe';
import { AuthenticationRepository } from '../authentication/autentication.repository';
import { AllowAny } from '../decorators/allow-any.decorator';


@ApiTags('players')
@Controller('players')
export class PlayersController {
    constructor(
        private readonly playersService: PlayersService,
        private readonly authenticationRepository: AuthenticationRepository
        ) {}

    @ApiOperation({ summary: 'Get all players' })
    @Get()
    async findAllPlayer(): Promise<Player[]> {
        try{
            return await this.playersService.findAllPlayer()
        }catch(error){
            throw new HttpException(error.message, HttpStatus.FORBIDDEN);
        }
        
    }

    @ApiOperation({ summary: 'Get one player per _id , name or email' })
    @Get(':identifier')
    async findOnePlayer(@Param('identifier', PlayerValidatePipeGet) identifier: string): Promise<Player> {
        try{
            return await this.playersService.findOnePlayer(identifier)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        }
    }

    @ApiOperation({ summary: 'create user' })
    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(
        @Body() createPlayerDto : CreatePlayerDto) {
        try{
            return await this.playersService.createPlayer(createPlayerDto)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @ApiOperation({ summary: 'update user' })
    @Put(':id')
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Param('id', PlayerValidatePipe) id: string,
        @Body() createPlayerDto : CreatePlayerDto) {
        try{
            return await this.playersService.updatePlayer(id,createPlayerDto)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'update ranking' })
    @Put(':ranking')
    async updateRanking(@Body() objRanking: UserRanking): Promise<UserRanking> {
        try{
            return await this.playersService.updateRanking(objRanking)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation({ summary: 'delete player' })
    @Delete(':id')
    async deletePlayer(@Param('id', PlayerValidatePipe) id: string): Promise<CustomDeleteResult> {
        try{
            return await this.playersService.deletePlayer(id)
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @AllowAny()
    @Post('login')
    async login(@Request() req: any) {
        try{
        return this.authenticationRepository.getAuthentication(req.body);
        }catch(error){
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}