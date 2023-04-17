import mongoose, { ObjectId } from 'mongoose';
import { Schema, model, Types } from 'mongoose';

const ItemsSchema = new Schema({

    itemName: {
        type: String,
        required:true
    },
    itemCode: {
        type: String,
    },
    itemType:{
        type: String
    },
    sku: {
        type: String
    },
    quantity: {
        type: Number
    },
    price:{
        type: Number,
        required:true
    },
    
}, { timestamps: true })

export const Items = mongoose.model("Items", ItemsSchema);

