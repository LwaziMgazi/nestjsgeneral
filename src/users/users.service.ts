import { Injectable,Inject} from '@nestjs/common';
import {UsersRepository} from './repositories/users.repository';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


export type User = {
id : number;
username : string;
email : string;
password: string;
eventName?: string;

}

@Injectable()
export class UsersService {

   constructor( private usersRepository: UsersRepository) {

   }
    
   

    async findOne(username: string): Promise<User | undefined>{
         let users = (await this.usersRepository.findAllUsers()).find(users=>users.email===username);
    
        return users;

    }
}
