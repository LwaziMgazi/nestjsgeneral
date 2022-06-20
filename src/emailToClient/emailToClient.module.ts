import { Module } from "@nestjs/common";
import { EmailToClientController } from "./controllers/emailToClient.conroller";


@Module({
    imports :[],
    controllers :[
        EmailToClientController
    ]
})
export class EmailToClientModule {}