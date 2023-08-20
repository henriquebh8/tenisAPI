import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { ChallengerModule } from './challenger/challenger.module';
import { AuthenticationMiddleware } from './authentication/authentication.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthenticationRepository } from './authentication/autentication.repository';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://henriquebh8:cS6DJpfq7VcuexiP@cluster0.tlsey8s.mongodb.net/tenisAPI',
      }),
    }),
    PlayersModule,
    ChallengerModule,
    HttpModule,
  ],
  controllers: [AuthController],
  providers: [AuthenticationRepository],
})

export class AppModule{}
/*export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthenticationMiddleware)
    .exclude(
      { path: 'players/login', method: RequestMethod.ALL },
      { path: 'auth', method: 'ALL' },
    )
    .forRoutes('*');
  }
}*/