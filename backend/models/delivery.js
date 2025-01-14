import mongoose from "mongoose";
import User from "./user.js";
import Product from "./product.js";
// Plugin for deliveryNumber
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

const deliverySchema = new mongoose.Schema({
    deliveryNumber: {
        type: Number,
        unique: true,
        index: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    deliveryVan: {
        type: String,
        required: true,
        trim: true
    },
    assignedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: []
    }],
    status: {
        type: String,
        enum: ["pending", "in progress", "delivered"],
        default: "pending"
    },
    deliveryNote: {
        type: String,
        trim: true
    },
    deliveryAddress: {
        type: String,
        trim: true
    },
    deliveryCity: {
        type: String,
        trim: true
    },
    itemsDelivered: {
        type: Number,
        default: 0,
        min: [0, "Items delivered must not be negative."]
    },
    totalPrice: {
        type: Number,
        required: true,
        min: [0, "Total price must not be negative."]
    },
    totalWeight: {
        type: Number,
        min: [0, "Totel weight must not be negative."]
    },
    expectedDeliveryTime: { type: Date },
    trackingNumber: { 
        type: String,
        trim: true,
        unique: true
    },
    deliveryInstructions: {
        type: String,
        trim: true
    },
    paymentStatus: {
        type: String,
        trim: true,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },
    // Optional delivery details
    deliveryPostcode: {
        type: String,
        trim: true
    },
    deliveryCountry: {
        type: String,
        trim: true
    },
    deliveryContact: {
        type: String,
        trim: true
    },
    deliveryPhoneNumber: {
        type: String,
        trim: true
    },
    deliveryEmail: {
        type: String,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1."]
    }
}, {timestamps: true });

// config Plugin for deliveryNumber
deliverySchema.plugin(AutoIncrement, {inc_field: "deliveryNumber", start_seq: 1000});

const Delivery = mongoose.model("Delivery", deliverySchema);

export default Delivery;