import { Module } from "@nestjs/common";
import { UsersController } from "./controller/users.controller";
import { userSchema} from "./schemas/users.schema";
import {MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from "./repositories/users.repository";
import { UsersService } from './users.service';
import { ChambersModule } from '../chambers/chambers.module';

@Module({
    imports :[
        MongooseModule.forFeature([
            {
                name: 'users',
                schema: userSchema
            }
        ]),
        ChambersModule
    ],
    controllers :[
        UsersController
    ],
    providers: [
        UsersRepository,
        UsersService
    ],
    exports: [UsersService, UsersRepository]
})
export class UsersModule {}