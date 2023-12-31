import * as mongoose from 'mongoose';
import { timestamp } from 'rxjs';

export const PlayerSchema = new mongoose.Schema({
    phoneNumber:{type: String, unique:true},
    email: {type: String, unique:true},
    login: String,
    password: {type: String, unique:true},
    name: String,
    ranking: String,
    positionRanking: Number,
    urlPhoto: String,
},{timestamps:true, collection:'players'})
