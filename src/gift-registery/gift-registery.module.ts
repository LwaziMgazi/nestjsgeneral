import { Module } from '@nestjs/common';
import { GiftRegisteryController } from './controller/gift-registery.controller';
import {MongooseModule } from '@nestjs/mongoose';
import { giftsSchema} from './schema/gift-registery.schema';
import {RsvpService} from '../rsvp/rsvp.service';
import {GiftRepository} from './repositories/gifts.repository';
@Module({
  imports :[
    MongooseModule.forFeature([
        {
            name: 'gifts',
            schema: giftsSchema
        }
    ])
],
  controllers: [GiftRegisteryController],
  providers: [GiftRepository,RsvpService]
})
export class GiftRegisteryModule {}
