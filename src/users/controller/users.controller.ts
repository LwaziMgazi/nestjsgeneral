import { Body, Controller, Get, Param, Patch, Post, Put, NotFoundException } from "@nestjs/common";
import { ImaboItems } from "src/model/maboItems";
import { UsersRepository } from "../repositories/users.repository";
import { UsersService } from '../users.service'

@Controller('api')
export class UsersController {
   constructor(private usersRepository: UsersRepository , private usersService:UsersService  ){}

  
   @Get('users')
   async getAllUsers() {
    let users = (await this.usersRepository.findAllUsers());
    console.log('------',users);
    return  users;
   }

   @Post('user')
   async addItem(@Body() newUser){
    let isUserEmailRegistered = (await this.usersRepository.findAllUsers()).find(user=>user.email===newUser.email);
   
    if(!!isUserEmailRegistered){
        throw new NotFoundException('email already registered')
    }
       return this.usersRepository.addUser(newUser);
   }
 }