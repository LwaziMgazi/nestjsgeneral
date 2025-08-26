import * as mongoose from 'mongoose';

export class IUsers {
name : String;
surname: String;
email : String;
password: String;
eventName?: String;
taxNumber?:String;
contactNumber?: String;
homeAddress?: String;
postalCode?: String;
id?:any;
chamberDocId?: string;
  }

export const userSchema = new mongoose.Schema({
name : String,
surname: String,
email : String,
password: String,
eventName: String,
taxNumber:String,
contactNumber: String,
homeAddress: String,
postalCode: String,
chamberDocId: String,
});