import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChallengerController } from './challenger.controller';
import { ChallengerService } from './challenger.service';
import { PlayersService } from 'src/players/players.service';
import { ChallengeSchema } from '../interface/challenge.schema';
import { PlayerSchema } from '../interface/player.schema';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenge', schema: ChallengeSchema },
      { name: 'Player', schema: PlayerSchema }
    ]),
    PlayersModule,
  ],
  controllers: [ChallengerController],
  providers: [ChallengerService, PlayersService],
  exports: [ChallengerService],
})
export class ChallengerModule {}