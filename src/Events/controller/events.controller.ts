import { Body, Controller, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { IEvents } from "src/model/maboItems";
import { EventRepository } from "../repository/event.repository";

@Controller('api')
export class EventsController {
   constructor(private eventRepository: EventRepository){}

    @Post('event')
    addEvent(@Body() newEvent){
      return this.eventRepository.addEvent(newEvent);
    }

    @Get('/event/:ref')
    getEventByEmail(@Param('ref') email: string) {
        return this.eventRepository.findByemail(email);
    }

    @Put('event/:id')
    async updateItem(@Param('id') _id : string, @Body() changes: Partial<IEvents>){
     return this.eventRepository.updateEvent(_id,changes);
    }
 }