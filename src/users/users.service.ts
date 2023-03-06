import { Injectable,Inject} from '@nestjs/common';
import {UsersRepository} from './repositories/users.repository';

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
