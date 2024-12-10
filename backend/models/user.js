import mongoose from "mongoose";
import { v4 } from "uuid";

const addressDetailsSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    houseNumber: {
        type: String,
        required: true
    },
    postcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

const contactDetailsSchema = new mongoose.Schema({
    phoneNumber: {
        type: String
    },
    onCall: {
        type: Boolean,
        required: true,
        default: false
    },
    onCallPhoneNumber: {
        type: String
    }
});

const userSchema = new mongoose.Schema({
    authorisationRole: {
        type: String,
        required: true,
        enum: ["user", "manager", "admin"],
        default: "user"
    },
    personnelNumber: {
        type: String,
        required: true,
        unique: true,
        default: v4,
        index: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    addressDetails: addressDetailsSchema,
    contactDetails: contactDetailsSchema,
    userName: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        minlength: [8, "The selected password is too short and must be at least 8 characters long."]
    },
    employedSince: {
        type: Date,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    department: {
        type: String,
        trim: true
    },
    supervisor: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;