import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { ChallengerModule } from './challenger/challenger.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://henriquebh8:cS6DJpfq7VcuexiP@cluster0.tlsey8s.mongodb.net/tenisAPI',
      }),
    }),
    PlayersModule,
    ChallengerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
