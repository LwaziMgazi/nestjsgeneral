import { Module } from "@nestjs/common";
import { EventsController } from "./controller/events.controller";
import { eventSchema } from "./schemas/event.schema";
import {MongooseModule } from '@nestjs/mongoose';
import { EventRepository  } from "./repository/event.repository";


@Module({
    imports :[
        MongooseModule.forFeature([
            {
                name: 'events',
                schema: eventSchema
            }
        ])
    ],
    controllers :[
        EventsController
    ],
    providers: [
        EventRepository
    ]
})
export class EventsModule {}