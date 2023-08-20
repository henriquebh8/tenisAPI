import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateChallengerDTO } from '../dto/createChallenger.dto'
import { Challenge } from 'src/interface/challenge.interface';
import { PlayersService } from 'src/players/players.service';


@Injectable()
export class ChallengerService {
    constructor(
        @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
        //@InjectModel('Partida') private readonly partidaModel: Model<Partida>,
        private readonly playersService: PlayersService,
        //private readonly categoriasService: CategoriasService
        ) {}


    async createChallenger(createChallengerDTO : CreateChallengerDTO): Promise<any> {
        const playerFound = this.playersService.findAllPlayer()
        return playerFound
    }
}
