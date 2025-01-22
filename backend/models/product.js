import mongoose from "mongoose";
import { v4 } from "uuid";

// SubSchema price
const priceSchema = new mongoose.Schema({
    nonBindingSalesPrice: {
        value: {
            type: Number,
            min: [0, "The amount must not be negative."]
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "JPY", "GBP", "AUD"],
            default: "USD"
        }
    },
    purchasePrice: {
        value: {
            type: Number,
            min: [0, "The amount must not be negative."],
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "JPY", "GBP", "AUD"],
            default: "USD"
        }
    },
    sellingPrice: {
        value: {
            type: Number,
            min: [0, "The amount must not be negative."],
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "JPY", "GBP", "AUD"],
            default: "USD"
        }
    }
});

// SubSchema barcode
const barcodeSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    format: {
        type: String,
        enum: ["EAN-13", "UPC", "CODE128", "QR"],
        default: "CODE128"
    },
    lastScanned: {
        type: Date,
        default: Date.now
    }
});

// SubSchema description
const descriptionSchema = new mongoose.Schema({
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    longDescription: {
        type: String,
        required: true,
        maxlength: [2000, "Product name must not be longer than 1000 characters"],
        trim: true
    },
    model: {
        type: String,
        trim: true
    },
    features: [{
        type: String,
        trim: true
    }],
    materials: [{
        type: String,
        trim: true
    }],
    weight: {
        value: Number,
        unit: {
            type: String,
            enum: ["kg", "g", "lb", "lbs", "oz"],
            default: "kg"
        }
    },
    dimensions: {
        length: {
            type: Number,
            trim: true
        },
        width: {
            type: Number,
            trim: true
        },
        height: {
            type: Number,
            trim: true
        },
        unit: {
            type: String,
            enum: ["cm", "m", "in", "ft"],
            default: "m"
        }
    },
    warranty: {
        duration: {
            type: Number,
            trim: true
        },
        unit: {
            type: String,
            enum: ["months", "years"],
            default: "years"
        }
    },
    customAttributes: [{
        key: String,
        value: mongoose.Schema.Types.Mixed
    }]
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
    // shelf: {
	// 	type: mongoose.Schema.Types.ObjectId,
    //     ref: "Warehouse.shelves"
	// },
    // String placeholder for missing shelf ref
    shelf: { type: String },
    warehouse: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warehouse"
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
            "in_stock",
            "almost_sold_out",
            "sold_out", 
            "reordered",
            "can_not_be_reordered", 
            "stock_transfer", 
            "packing_station",
            "in_delivery",
            "delivered",
            "delay_by_supplier",
            "delay_in_delivery"
        ],
        default: "in_stock"
    },
    amount: {
        type: Number,
        required: true,
        min: [0, "The amount of product must not be negative."]
    },
    minAmount: {
        type: Number,
        required: true,
        min: [0, "The minimum amount of product must not be negative."]
    },
    barcode: barcodeSchema,
    description: descriptionSchema
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;