import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {SchemaTypes, Types} from 'mongoose';
@Schema({collection: 'chambersInvestments'})
export class ChambersInvestmentsDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id?: Types.ObjectId


    @Prop()
    totalInvestment: any[];

    @Prop()
    avaliableCash: string;

    @Prop()
    unPaidInvoices: any[]

    @Prop()
    totalRetrun: any[]
    @Prop()
    user:string;

}

export const ChambersInvestmentsSchema = SchemaFactory.createForClass(ChambersInvestmentsDocument);