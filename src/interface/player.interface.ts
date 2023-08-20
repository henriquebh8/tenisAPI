import { Document } from 'mongoose';

export interface Player extends Document {
    readonly _id: string;
    phoneNumber?: string;
    email?: string;
    name?: string;
    ranking?: string;
    positionRanking?: number;
    urlPhoto?: string;
    login?: string;
    password?: string;
}

export interface UserRanking {
    readonly _id: string;
    ranking?: string;
    positionRanking?: number;
}

export interface CustomDeleteResult {
    ok?: number;
    n?: number;
    deletedCount?: number;
}