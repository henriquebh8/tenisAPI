import { Document } from 'mongoose';
import { Player } from './player.interface';


export interface Challenge extends Document {
    dateTimeChallenger: Date
    status: ChallengeStatus
    dateTimeSendChallenge: Date
    dateTimeresponseChallenge: Date
    challenger: Player
    category: string
    players: Array<Player>
    match: Match  
}
export interface Match extends Document{
    categoria: string
    players: Array<Player>
    def: Player
    matchResult: Array<Result>  
}
export interface Result {
    set: string
}

export enum ChallengeStatus {
    REALIZED = 'REALIZED',
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    DENIED = 'DENIED',
    CANCELED = 'CANCELED'
  }
