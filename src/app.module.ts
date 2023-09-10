import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailToClientModule } from './emailToClient/emailToClient.module';
import { MaboItemsModule } from './maboItems/maboItems.module';
import { MONGODB_CONNECTION_URL } from './shared/constants/constants';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule} from './users/users.module';
import { EventsModule} from './Events/events.module';
import {EmailToClientHtmlService} from './shared/services/emailToClientHtml.service';
import { RsvpModule } from './rsvp/rsvp.module';
import { GiftRegisteryModule } from './gift-registery/gift-registery.module';


@Module({
  imports: [
    EmailToClientModule, 
    MaboItemsModule,
    UsersModule,
    EventsModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    AuthModule,
    RsvpModule,
    GiftRegisteryModule
  ],
  controllers: [AppController],
  providers: [AppService,EmailToClientHtmlService ]
 
})
export class AppModule {}
