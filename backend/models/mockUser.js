import User from "./user.js";
import mongoose from "mongoose";

const mockUsers = [
    {
        authorisationRole: "user",
        firstName: "Max",
        lastName: "Mustermann",
        addressDetails: {
            street: "Musterstraße",
            houseNumber: "123",
            postcode: "12345",
            city: "Musterstadt"
        },
        contactDetails: {
            phoneNumber: "0123456789",
            onCall: false,
            onCallPhoneNumber: ""
        },
        userName: "user",
        password: "user1234",
        employedSince: new Date("2020-01-01"),
        birthday: new Date("1990-01-01"),
        department: "Warehouse"
    },
    {
        authorisationRole: "manager",
        firstName: "Anna",
        lastName: "Beispiel",
        addressDetails: {
            street: "Beispielweg",
            houseNumber: "1a",
            postcode: "67890",
            city: "Beispielstadt"
        },
        contactDetails: {
            phoneNumber: "9876543210",
            onCall: true,
            onCallPhoneNumber: "1122334455"
        },
        userName: "manager",
        password: "manager1234",
        employedSince: new Date("2018-06-15"),
        birthday: new Date("1985-05-15"),
        department: "Accounting"
    },
    {
        authorisationRole: "admin",
        firstName: "John",
        lastName: "Doe",
        addressDetails: {
            street: "Adminstraße",
            houseNumber: "78",
            postcode: "54321",
            city: "Admindorf"
        },
        contactDetails: {
            phoneNumber: "1357924680",
            onCall: true,
            onCallPhoneNumber: "877887788778"
        },
        userName: "admin",
        password: "admin1234",
        employedSince: new Date("2015-03-01"),
        birthday: new Date("1980-12-31"),
        department: "IT"
    }
]

async function createMockUsers() {
    try {
        await mongoose.connect("mongodb://localhost:27017/storage");

        for (const userData of mockUsers) {
            const user = new User(userData);
            await user.save();
            console.log(`Created user: ${user.firstName} ${user.lastName}`);
        }

        console.log("Mock data created successfully");
    } catch (err) {
        console.error("Error creating mock data:", err.message);
    } finally {
        mongoose.disconnect();
    }
}

createMockUsers();