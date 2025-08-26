import { Module } from '@nestjs/common';
import {ChambersInvestmentsSchema, ChambersInvestmentsDocument } from './schema/chambers.schema';
import {MongooseModule } from '@nestjs/mongoose';
import {ChambersInvestmentsRepository} from './repository/chambers.repository';
import { ChambersController } from './controllers/chambers.controller';
@Module({
    imports: [MongooseModule.forFeature([{
        name: ChambersInvestmentsDocument.name,
        schema: ChambersInvestmentsSchema
    }]) ],
    controllers: [ChambersController],
    providers: [ChambersInvestmentsRepository],
    exports: [ChambersInvestmentsRepository]
})
export class ChambersModule {}
