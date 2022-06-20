import { Module } from "@nestjs/common";
import { MaboItemsController } from "./controllers/maboItems.controller";
import { maboItemSchema } from "./schemas/maboItem.schema";
import {MongooseModule } from '@nestjs/mongoose';
import { MaboItemsRepository } from "./repositories/maboItems.repository";


@Module({
    imports :[
        MongooseModule.forFeature([
            {
                name: 'maboItems',
                schema: maboItemSchema
            }
        ])
    ],
    controllers :[
        MaboItemsController
    ],
    providers: [
        MaboItemsRepository
    ]
})
export class MaboItemsModule {}