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


@Module({
  imports: [
    EmailToClientModule, 
    MaboItemsModule,
    UsersModule,
    EventsModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_URL),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService]
 
})
export class AppModule {}
