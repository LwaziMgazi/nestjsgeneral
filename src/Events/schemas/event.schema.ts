import * as mongoose from 'mongoose';
import { ImaboItems} from '../../model/maboItems'

export const eventSchema = new mongoose.Schema({
    refToUser: String,
    eventName: String,
    items: Array<ImaboItems>
});