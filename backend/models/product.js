import mongoose from "mongoose";
import { v4 } from "uuid";

// SubSchema Price
const priceSchema = new mongoose.Schema({
    nonBindingSalesPrice: {
        type: Number,
        min: [0, "The amount must not be negative."]
    },
    purchasePrice: {
        type: Number,
        min: [0, "The amount must not be negative."],
        required: true
    },
    sellingPrice: {
        type: Number,
        min: [0, "The amount must not be negative."],
        required: true
    }
});

// ProductSchema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required."],
        trim: true,
        maxlength: [100, "Product name must not be longer than 100 characters"],
        match: [/^[a-zA-Z0-9\s]+$/, "Only letters (a-z, A-Z), numbers (0-9) and spaces are permitted."]
    },
    productNumber: {
        type: String,
        unique: true,
        default: v4,
        index: true
    },
    category: {
        type: String,
        required: true,
        maxlength: [100, "Product name must not be longer than 100 characters"],
        match: [/^[a-zA-Z0-9\s]+$/, "Only letters (a-z, A-Z), numbers (0-9) and spaces are permitted."],
        trim: true
    },
    price: priceSchema,
    expressDispatch: {
        type: Boolean,
        required: true,
        default: false
    },
    availableColours: { 
        type: [String],
        trim: true,
        match: [/^[a-zA-Z]+$/, "Only letters (a-z, A-Z) are permitted."]
    },
    fragile: {
        type: Boolean,
        required: true,
        default: false
    },
    packagingSize: {
        type: [Number],
        required: true,
        validate: [
            {
                validator: function(arr) {
                    return arr.every(num => num >= 0);
                },
                message: "All values in packagingSize must be non-negative."
            },
            {
                validator: function(arr) {
                    return arr.length === 3;
                },
                message: "packagingSize must contain exactly 3 values."
            }
        ]
    },
    fillingMaterial: {
        required: {
            type: Boolean,
            required: true,
            default: false
        },
        amount: {
            type: Number,
            required: function() { return this.fillingMaterial.required; },
            min: [0, "The amount of filling material must not be negative."],
            validate: {
                validator: function(v) {
                    return this.fillingMaterial.required ? v > 0 : true;
                },
                message: "Amount must be greater than 0 when filling material is required."
            }
        }
    },
    shelf: {
		type: String,
        required: true
	},
    deliveryVan: {
		type: String
	},
    supplierNumber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Supplier'
    },
    status: {
        type: String,
        required: true,
        enum: [
            "in stock", 
            "almost sold out", 
            "sold out", 
            "reordered", 
            "can not be reordered", 
            "stock transfer", 
            "packing station",
            "in delivery",
            "delivered",
            "delay by supplier",
            "delay in delivery"
        ],
        default: "in stock"
    }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;