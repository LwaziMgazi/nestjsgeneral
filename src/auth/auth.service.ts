import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import { IUsers } from '../users/schemas/users.schema';
@Injectable()
export class AuthService {
    constructor(private usersService:UsersService, private jwtService: JwtService) {

    }

    async validateTheUser(username: string, pwd: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        if(!!user && user.password ===pwd) {
            const {name, password,...rest} = user;
            return user;
        }
        return null;
    }

    async logIn(user: IUsers) {
      const payload = {
        name : user.name,
        sub : user.id
      }
      return {
        access_token : this.jwtService.sign(payload,{secret : 'SECRET'}),
        email: user.email,
        eventName: user.eventName
      }
    }
}
