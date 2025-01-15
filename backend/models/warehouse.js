import mongoose from "mongoose";
import Delivery from "./delivery.js";
import Product from "./product.js";
import User from "./user.js";
// Plugin for shelfNumber
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

// Subschema for shelf  
const shelfSchema = new mongoose.Schema({
    shelfNumber: {
        type: Number,
        unique: true,
        index: true,
        required: true
    },
    shelfCode: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        min: [1, "Shelf capacity must be at least 1."],
    },
    currentLoad: {
        type: Number,
        default: 0,
        min: [0, "Current load must not be negative."]
    },
    isFragile: {
        type: Boolean,
        default: false
    },
    isExpress: {
        type: Boolean,
        default: false
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
});

// Schema warehouse
const warehouseSchema = new mongoose.Schema({
    warehouseName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: [50, "Warehouse name must not exceed 50 characters."],
        index: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    shelves: [shelfSchema],
    totalCapacity: {
        type: Number,
        required: true,
        min: [0, "Total capacity must not be negative."]
    },
    assignedUser: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    deliveryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Delivery"
    }]
}, {timestamps: true });

// Plugin for shelfNumber
shelfSchema.plugin(AutoIncrement, {inc_field: "shelfNumber", start_seq: 10000});

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

export default Warehouse;