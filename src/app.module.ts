import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailToClientModule } from './emailToClient/emailToClient.module';
import { MaboItemsModule } from './maboItems/maboItems.module';
import { MONGODB_CONNECTION_URL } from './shared/constants/constants';
import { AuthModule } from './auth/auth.module';
import { UsersModule} from './users/users.module';
import { EventsModule} from './Events/events.module';
import {EmailToClientHtmlService} from './shared/services/emailToClientHtml.service';
import { RsvpModule } from './rsvp/rsvp.module';
import { GiftRegisteryModule } from './gift-registery/gift-registery.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleTasksService } from './shared/services/schedule-tasks/schedule-tasks.service';
import { BondAttackModule } from './bond-attack/bond-attack.module';
import { HandleFilesModule } from './handle-files/handle-files.module';
import { MulterModule } from '@nestjs/platform-express';
import { AppsMiddleware } from './middleware/apps.middle';
@Module({
  imports: [
    EmailToClientModule, 
    MaboItemsModule,
    UsersModule,
    EventsModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    AuthModule,
    RsvpModule,
    GiftRegisteryModule,
    ScheduleModule.forRoot(),
    BondAttackModule,
    HandleFilesModule,
    MulterModule
  ],
  controllers: [AppController],
  providers: [AppService,EmailToClientHtmlService, ScheduleTasksService , ScheduleTasksService]
 
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AppsMiddleware).forRoutes('*');
  }
}
