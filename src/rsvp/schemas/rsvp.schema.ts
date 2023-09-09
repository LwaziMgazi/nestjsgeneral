import * as mongoose from 'mongoose';


export const rsvpSchema = new mongoose.Schema({
    event: String,
    people: Array<invitedPeople>,
    total: Number,
});
interface invitedPeople{
    name: string;
    noOfPeople:  number;
}