import { Module } from '@nestjs/common';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import {MongooseModule} from '@nestjs/mongoose';
import { PlayerSchema } from 'src/interface/player.schema';
import { AuthenticationRepository} from '../authentication/autentication.repository';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }]),
  HttpModule
],
  controllers: [PlayersController],
  providers: [PlayersService, AuthenticationRepository],
  exports:[PlayersService]
})
export class PlayersModule {}
