import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthenticationRepository } from './autentication.repository';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private authenticationRepository: AuthenticationRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {

    if( !req['token'] && req.body.login ) {
      try {
        const user = {
          login: req.body.login,
          password: req.body.password
        }
  
  
        const userData: any = await this.authenticationRepository.getAuthentication(user);
        
        req['token'] = userData.access_token;
        req['user'] = userData.user;
  
        next();
      } catch (error) {
        res.status(401).send('Authentication failed');
      }
    }
    }
      
    
  }