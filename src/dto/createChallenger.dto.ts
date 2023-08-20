import { IsNotEmpty, IsArray, ArrayMinSize, IsDateString, ArrayMaxSize } from "class-validator";
import { Player } from "src/interface/player.interface";

export class CreateChallengerDTO {

    @IsNotEmpty()
    @IsDateString()
    dateTimeChallenger: Date;

    @IsNotEmpty()
    challenger: Player;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    players: Array<Player>

}