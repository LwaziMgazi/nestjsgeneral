import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {ChambersInvestmentsDocument} from "../schema/chambers.schema";
@Injectable()
export class ChambersInvestmentsRepository {
  constructor(@InjectModel(ChambersInvestmentsDocument.name) private chambersInvestmentsDocModel :Model<ChambersInvestmentsDocument>){}

    async addChambersInvestmentsDocument(chambersInvestmentsItem: any) {
        console.log(chambersInvestmentsItem);
        let user = new this.chambersInvestmentsDocModel(chambersInvestmentsItem);

        return user.save()
    }
}