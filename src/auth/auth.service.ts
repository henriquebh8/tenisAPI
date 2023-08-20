import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        const user = context.switchToHttp().getRequest().user;

        if (!user) {
            return true;
        }

        if (!roles) {
            return true;
        }

        return this.isUserAllowed(roles, user.roles);
    }

    private isUserAllowed(
        roles: string[],
        userRoles: string[] | string,
    ): boolean {
        if (Array.isArray(userRoles)) {
            return roles.some(role => {
                return userRoles.find(userRole => userRole === role);
            });
        }

        return roles.includes(userRoles);
    }
}
