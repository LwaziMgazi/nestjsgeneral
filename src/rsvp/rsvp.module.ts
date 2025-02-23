import { Module } from '@nestjs/common';
import { RsvpController } from './controllers/rsvp.controller';
import {MongooseModule } from '@nestjs/mongoose';
import {RsvpRepository} from './repositories/rsvp.repository';
import {rsvpSchema} from './schemas/rsvp.schema'
import { RsvpService } from './rsvp.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'rsvps',
        schema: rsvpSchema
      }
    ])
  ],
  controllers: [RsvpController],
  providers:[
    RsvpRepository,
    RsvpService
  ]
})
export class RsvpModule {}
