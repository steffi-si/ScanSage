import mongoose from "mongoose";
// Plugin for personnelNumber
import AutoIncrementFactory from "mongoose-sequence";
const AutoIncrement = AutoIncrementFactory(mongoose);

// SubSchema address
const addressDetailsSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        trim: true
    },
    houseNumber: {
        type: String,
        required: true,
        trim: true
    },
    postcode: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    }
});

// SubSchema contact
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

// UserSchema
const userSchema = new mongoose.Schema({
    authorisationRole: {
        type: String,
        required: true,
        enum: ["user", "manager", "admin"],
        default: "user"
    },
    personnelNumber: {
        type: Number,
        unique: true,
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
        trim: true,
        index: true,
        match: [/^[a-zA-Z0-9\s]+$/, "Only letters (a-z, A-Z), numbers (0-9) and spaces are permitted."]
    },
    password: {
        type: String,
        trim: true,
        minlength: [8, "The selected password is too short and must be at least 8 characters long."],
        index: true
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

// config Plugin for personnelNumber
userSchema.plugin(AutoIncrement, {inc_field: "personnelNumber", start_seq: 1000});

const User = mongoose.model("User", userSchema);

export default User;