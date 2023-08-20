import {
    BadRequestException,
    Scope
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

export const UserFactory = {
    provide: 'API_USER',
    scope: Scope.REQUEST,
    inject: [ REQUEST ],
    useFactory: (req: Request): number => {
        const user = req.headers['jwt_token'];

        if (user) {
            const bufferDecode = Buffer.from(user, 'base64');
            const UserHeader = JSON.parse(bufferDecode.toString('utf-8'));

            if (!UserHeader) {
                throw new BadRequestException('Header "jwt_token" not found');
            }

            return UserHeader;
        }

        return null;
    }
};





