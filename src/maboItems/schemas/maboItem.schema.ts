import * as mongoose from 'mongoose';


export const maboItemSchema = new mongoose.Schema({
    title: String,
    estimatedPrice: String,
    addedPrices: Array,
});