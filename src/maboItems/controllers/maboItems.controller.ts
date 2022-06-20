import { Body, Controller, Get, Param, Patch, Put } from "@nestjs/common";
import { ImaboItems } from "src/model/maboItems";
import { MaboItemsRepository } from "../repositories/maboItems.repository";

@Controller('api')
export class MaboItemsController {
   constructor(private maboItemsRepository: MaboItemsRepository){}

   @Get('items')
   async findAll(): Promise<ImaboItems[]>{
    return this.maboItemsRepository.findAll();
   }
   
   @Get('item/:id')
   async findOneItem(@Param('id') _id: string): Promise<ImaboItems>{
           return this.maboItemsRepository.findOneItem(_id);
   }
   @Put('item/:id')
   async updateItem(@Param('id') _id : string, @Body() changes: Partial<ImaboItems>){
    return this.maboItemsRepository.updateItem(_id,changes);
   }
 }