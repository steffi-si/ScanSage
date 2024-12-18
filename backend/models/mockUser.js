import User from "./user.js";
import mongoose from "mongoose";

const mockUsers = [
    // User
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
        authorisationRole: "user",
        firstName: "Erika",
        lastName: "Musterfrau",
        addressDetails: {
            street: "Musterweg",
            houseNumber: "456",
            postcode: "54321",
            city: "Musterdorf"
        },
        contactDetails: {
            phoneNumber: "9876543210",
            onCall: false,
            onCallPhoneNumber: ""
        },
        userName: "user2",
        password: "user2345",
        employedSince: new Date("2019-01-01"),
        birthday: new Date("1995-01-01"),
        department: "Logistics"
    },
    {
        authorisationRole: "user",
        firstName: "Hans",
        lastName: "Müller",
        addressDetails: {
            street: "Müllerstraße",
            houseNumber: "789",
            postcode: "98765",
            city: "Müllerdorf"
        },
        contactDetails: {
            phoneNumber: "2468135790",
            onCall: false,
            onCallPhoneNumber: "0667985354"
        },
        userName: "user3",
        password: "user3434",
        employedSince: new Date("2018-01-01"),
        birthday: new Date("1997-01-01"),
        department: "Account Management"
    },
    // Manager
    {
        authorisationRole: "manager",
        firstName: "Anna",
        lastName: "Beispiel",
        addressDetails: {
            street: "Beispielweg",
            houseNumber: "10a",
            postcode: "67890",
            city: "Beispielstadt"
        },
        contactDetails: {
            phoneNumber: "9876543210",
            onCall: true,
            onCallPhoneNumber: "1122334455"
        },
        userName: "manager",
        password: "manager1010",
        employedSince: new Date("2018-06-15"),
        birthday: new Date("1985-05-15"),
        department: "Accounting"
    },
    {
        authorisationRole: "manager",
        firstName: "Hans",
        lastName: "Müller",
        addressDetails: {
            street: "Müllerstraße",
            houseNumber: "456",
            postcode: "54321",
            city: "Müllerdorf"
        },
        contactDetails: {
            phoneNumber: "1357924680",
            onCall: true,
            onCallPhoneNumber: "998877665544"
        },
        userName: "manager2",
        password: "manager2323",
        employedSince: new Date("2016-09-01"),
        birthday: new Date("1982-10-01"),
        department: "Warehouse"
    },
    {
        authorisationRole: "manager",
        firstName: "Lisa",
        lastName: "Schulze",
        addressDetails: {
            street: "Schulstraße",
            houseNumber: "789",
            postcode: "98765",
            city: "Schulstadt"
        },
        contactDetails: {
            phoneNumber: "2468135790",
            onCall: true,
            onCallPhoneNumber: "998877665544"
        },
        userName: "manager3",
        password: "manager3434",
        employedSince: new Date("2017-12-01"),
        birthday: new Date("1987-03-01"),
        department: "Logistics"
    },
    // Admin
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
    },
    {
        authorisationRole: "admin",
        firstName: "Jane",
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
            onCallPhoneNumber: "4444666600440"
        },
        userName: "admin2",
        password: "admin2345",
        employedSince: new Date("2016-01-01"),
        birthday: new Date("1982-01-01"),
        department: "IT"
    },
    {
        authorisationRole: "admin",
        firstName: "Karl",
        lastName: "Black",
        addressDetails: {
            street: "Blackstraße",
            houseNumber: "78",
            postcode: "54321",
            city: "Beispielstadt"
        },
        contactDetails: {
            phoneNumber: "1357924680",
            onCall: true,
            onCallPhoneNumber: "998877665544"
        },
        userName: "admin3",
        password: "admin3434",
        employedSince: new Date("2017-01-01"),
        birthday: new Date("1987-01-01"),
        department: "IT"
    }
]

async function createMockUsers() {
    try {
        await mongoose.connect('mongodb://localhost:27017/storage');
        // delete existing data
        await User.deleteMany({});

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