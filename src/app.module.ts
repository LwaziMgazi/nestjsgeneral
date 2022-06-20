import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailToClientModule } from './emailToClient/emailToClient.module';
import { MaboItemsModule } from './maboItems/maboItems.module';
import { MONGODB_CONNECTION_URL } from './shared/constants/constants';

@Module({
  imports: [
    EmailToClientModule, 
    MaboItemsModule,
    MongooseModule.forRoot(MONGODB_CONNECTION_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
