import { Body, Controller, Logger, Post, UsePipes } from '@nestjs/common';
import { CreateChallengerDTO } from '../dto/createChallenger.dto'
import { ChallengerService } from './challenger.service';
import { PlayerValidatePipe } from '../pipes/players-validate.pipe';
import { Challenge } from '../interface/challenge.interface';

@Controller('challenger')
export class ChallengerController {
    constructor(private readonly challengerService: ChallengerService) {}
    private readonly logger = new Logger(ChallengerController.name)

    @Post()
    @UsePipes(PlayerValidatePipe)
    async createChallenger(
        @Body() createChallengerDTO: CreateChallengerDTO): Promise<any>{
            this.logger.log('createChallengerDTO',createChallengerDTO)
            return await this.challengerService.createChallenger(createChallengerDTO)

    }

}
