import * as mongoose from 'mongoose';

export const ChallengeSchema = new mongoose.Schema({
    dateTimeChallenger: { type: Date },
    status: { type: String },
    dateTimeSendChallenge: { type: Date },
    dateTimeresponseChallenge: { type: Date },
    challenger: {type: mongoose.Schema.Types.ObjectId, ref: "Jogador"},
    category: {type: String },
    players: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player"
    }],
    match: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Match" 
    },    
}, {timestamps: true, collection: 'challenge' })
