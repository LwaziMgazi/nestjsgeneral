import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../users.service";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel('users') private usersModel :Model<User>){}

    async addUser(userItem: any) {
        console.log(userItem);
        let user = new this.usersModel(userItem);

        user.save()
    }
   
   async findAllUsers(){
    return this.usersModel.find();
   }
    
}