import { Module } from "@nestjs/common";
import { EmailToClientController } from "./controllers/emailToClient.conroller";
import {EmailToClientHtmlService} from './../shared/services/emailToClientHtml.service';

@Module({
    imports :[],
    controllers :[
        EmailToClientController
    ],
    providers: [EmailToClientHtmlService]
})
export class EmailToClientModule {}