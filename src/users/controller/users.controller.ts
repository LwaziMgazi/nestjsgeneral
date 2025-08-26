import { Body, Controller, Get, Param, Patch, Post, Put, NotFoundException , BadRequestException} from "@nestjs/common";
import { IUsers } from "../schemas/users.schema";
import { UsersRepository  } from "../repositories/users.repository";
import { UsersService } from '../users.service';
import { ChambersInvestmentsRepository} from '../../chambers/repository/chambers.repository';
import { Types} from 'mongoose';
@Controller('api')
export class UsersController {
   constructor(
    private usersRepository: UsersRepository ,
    private usersService:UsersService,
    private chambersInvestmentsRepository:ChambersInvestmentsRepository ){}

  
   @Get('users')
   async getAllUsers() {
    let users = (await this.usersRepository.findAllUsers());
    return  users;
   }

   @Post('user/signup')
   async addItem(@Body() newUser: IUsers){
    let isUserEmailRegistered = (await this.usersRepository.findAllUsers()).find(user=>user.email===newUser.email);
   
    if(!!isUserEmailRegistered){
        throw new BadRequestException('email already registered')
    }
    if( newUser.eventName ==='chambers'){
        const chambersDoc = {
            _id: new Types.ObjectId(),
            totalInvestment :[],
            user:newUser.email,
            avaliableCash: '',
            unPaidInvoices: [],
             totalRetrun: [],
        };
        let newlyAddedChambersDoc = 
        await this.chambersInvestmentsRepository.addChambersInvestmentsDocument(chambersDoc);
        newUser.chamberDocId = newlyAddedChambersDoc._id.toString();

    }
       return this.usersRepository.addUser(newUser);
   }
 }