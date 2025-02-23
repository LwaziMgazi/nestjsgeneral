import * as mongoose from 'mongoose';
import {gift} from '../interfaces/gift-list.Interface'

export const giftsSchema = new mongoose.Schema({
    event: String,
    items: Array<gift>
});