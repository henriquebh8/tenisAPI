import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthenticationRepository {
  constructor(private readonly httpService: HttpService) {}

  async getAuthentication(user: any): Promise<AxiosResponse | AxiosError> {
    const userPayload = {
        login: user.login,
        password: user.password,
      };
    try {
      const response = await this.httpService
        .post(`http://localhost:3002/auth/login/`,userPayload)
        .toPromise();
        
      return response.data;
    } catch (error) {
      return error;
    }
  }
}