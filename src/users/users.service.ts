import { Injectable,Inject} from '@nestjs/common';
import {UsersRepository} from './repositories/users.repository';
import { IUsers} from './schemas/users.schema';

@Injectable()
export class UsersService {

   constructor( private usersRepository: UsersRepository) {

   }
    
   

    async findOne(username: string): Promise<IUsers | undefined>{
         let users = (await this.usersRepository.findAllUsers()).find(users=>users.email===username);
    
        return users;

    }
}
