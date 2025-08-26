import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IUsers } from '../schemas/users.schema';
import { Model } from "mongoose";


@Injectable()
export class UsersRepository {
    constructor(@InjectModel('users') private usersModel :Model<IUsers>){}

    async addUser(userItem: any) {
        console.log(userItem);
        let user = new this.usersModel(userItem);

       return user.save()
    }
   
   async findAllUsers(){
    return this.usersModel.find();
   }
    
}