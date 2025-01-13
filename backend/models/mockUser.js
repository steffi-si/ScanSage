import User from "./user.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      city: "Musterstadt",
    },
    contactDetails: {
      phoneNumber: "0123456789",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user",
    password: "testtest",
    employedSince: new Date("2020-01-01"),
    birthday: new Date("1990-01-01"),
    department: "Warehouse",
  },
  {
    authorisationRole: "user",
    firstName: "Erika",
    lastName: "Musterfrau",
    addressDetails: {
      street: "Musterweg",
      houseNumber: "456",
      postcode: "54321",
      city: "Musterdorf",
    },
    contactDetails: {
      phoneNumber: "9876543210",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user2",
    password: "testtest",
    employedSince: new Date("2019-01-01"),
    birthday: new Date("1995-01-01"),
    department: "Logistics",
  },
  {
    authorisationRole: "user",
    firstName: "Hans",
    lastName: "Müller",
    addressDetails: {
      street: "Müllerstraße",
      houseNumber: "789",
      postcode: "98765",
      city: "Müllerdorf",
    },
    contactDetails: {
      phoneNumber: "2468135790",
      onCall: false,
      onCallPhoneNumber: "0667985354",
    },
    userName: "user3",
    password: "testtest",
    employedSince: new Date("2018-01-01"),
    birthday: new Date("1997-01-01"),
    department: "Account Management",
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
      city: "Beispielstadt",
    },
    contactDetails: {
      phoneNumber: "9876543210",
      onCall: true,
      onCallPhoneNumber: "1122334455",
    },
    userName: "manager",
    password: "testtest",
    employedSince: new Date("2018-06-15"),
    birthday: new Date("1985-05-15"),
    department: "Accounting",
  },
  {
    authorisationRole: "manager",
    firstName: "Hans",
    lastName: "Müller",
    addressDetails: {
      street: "Müllerstraße",
      houseNumber: "456",
      postcode: "54321",
      city: "Müllerdorf",
    },
    contactDetails: {
      phoneNumber: "1357924680",
      onCall: true,
      onCallPhoneNumber: "998877665544",
    },
    userName: "manager2",
    password: "testtest",
    employedSince: new Date("2016-09-01"),
    birthday: new Date("1982-10-01"),
    department: "Warehouse",
  },
  {
    authorisationRole: "manager",
    firstName: "Lisa",
    lastName: "Schulze",
    addressDetails: {
      street: "Schulstraße",
      houseNumber: "789",
      postcode: "98765",
      city: "Schulstadt",
    },
    contactDetails: {
      phoneNumber: "2468135790",
      onCall: true,
      onCallPhoneNumber: "998877665544",
    },
    userName: "manager3",
    password: "testtest",
    employedSince: new Date("2017-12-01"),
    birthday: new Date("1987-03-01"),
    department: "Logistics",
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
      city: "Admindorf",
    },
    contactDetails: {
      phoneNumber: "1357924680",
      onCall: true,
      onCallPhoneNumber: "877887788778",
    },
    userName: "admin",
    password: "testtest",
    employedSince: new Date("2015-03-01"),
    birthday: new Date("1980-12-31"),
    department: "IT",
  },
  {
    authorisationRole: "admin",
    firstName: "Jane",
    lastName: "Doe",
    addressDetails: {
      street: "Adminstraße",
      houseNumber: "78",
      postcode: "54321",
      city: "Admindorf",
    },
    contactDetails: {
      phoneNumber: "1357924680",
      onCall: true,
      onCallPhoneNumber: "4444666600440",
    },
    userName: "admin2",
    password: "testtest",
    employedSince: new Date("2016-01-01"),
    birthday: new Date("1982-01-01"),
    department: "IT",
  },
  {
    authorisationRole: "admin",
    firstName: "Karl",
    lastName: "Black",
    addressDetails: {
      street: "Blackstraße",
      houseNumber: "78",
      postcode: "54321",
      city: "Beispielstadt",
    },
    contactDetails: {
      phoneNumber: "1357924680",
      onCall: true,
      onCallPhoneNumber: "998877665544",
    },
    userName: "admin3",
    password: "testtest",
    employedSince: new Date("2017-01-01"),
    birthday: new Date("1987-01-01"),
    department: "IT",
  },
  // Additional users for Warehouse department
  {
    authorisationRole: "user",
    firstName: "Klaus",
    lastName: "Weber",
    addressDetails: {
      street: "Lagerstraße",
      houseNumber: "22",
      postcode: "34567",
      city: "Lagerhausen",
    },
    contactDetails: {
      phoneNumber: "0123987654",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user4",
    password: "testtest",
    employedSince: new Date("2021-03-15"),
    birthday: new Date("1993-07-20"),
    department: "Warehouse",
  },

  // Additional user for Logistics department
  {
    authorisationRole: "user",
    firstName: "Sophie",
    lastName: "Schmidt",
    addressDetails: {
      street: "Logistikweg",
      houseNumber: "8",
      postcode: "76543",
      city: "Logistikstadt",
    },
    contactDetails: {
      phoneNumber: "0987654321",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user5",
    password: "testtest",
    employedSince: new Date("2022-01-10"),
    birthday: new Date("1991-11-05"),
    department: "Logistics",
  },

  // Additional users for Account Management department
  {
    authorisationRole: "user",
    firstName: "Julia",
    lastName: "Fischer",
    addressDetails: {
      street: "Kundenallee",
      houseNumber: "15",
      postcode: "23456",
      city: "Kundenhausen",
    },
    contactDetails: {
      phoneNumber: "0123456789",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user6",
    password: "testtest",
    employedSince: new Date("2021-09-01"),
    birthday: new Date("1994-03-25"),
    department: "Account Management",
  },
  {
    authorisationRole: "user",
    firstName: "Thomas",
    lastName: "Becker",
    addressDetails: {
      street: "Serviceweg",
      houseNumber: "3",
      postcode: "87654",
      city: "Servicehausen",
    },
    contactDetails: {
      phoneNumber: "9876543210",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user7",
    password: "testtest",
    employedSince: new Date("2023-02-15"),
    birthday: new Date("1992-09-10"),
    department: "Account Management",
  },

  // Additional users for Accounting department
  {
    authorisationRole: "user",
    firstName: "Maria",
    lastName: "Schneider",
    addressDetails: {
      street: "Buchhaltungsstraße",
      houseNumber: "7",
      postcode: "45678",
      city: "Rechnungsstadt",
    },
    contactDetails: {
      phoneNumber: "0123789456",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user8",
    password: "testtest",
    employedSince: new Date("2022-07-01"),
    birthday: new Date("1990-05-15"),
    department: "Accounting",
  },
  {
    authorisationRole: "user",
    firstName: "Peter",
    lastName: "Koch",
    addressDetails: {
      street: "Bilanzweg",
      houseNumber: "12",
      postcode: "56789",
      city: "Bilanzhausen",
    },
    contactDetails: {
      phoneNumber: "9876123450",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user9",
    password: "testtest",
    employedSince: new Date("2023-01-15"),
    birthday: new Date("1988-12-20"),
    department: "Accounting",
  },

  // Additional users for IT department
  {
    authorisationRole: "user",
    firstName: "Laura",
    lastName: "Meyer",
    addressDetails: {
      street: "Serverstraße",
      houseNumber: "42",
      postcode: "98765",
      city: "Techstadt",
    },
    contactDetails: {
      phoneNumber: "0123456789",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user10",
    password: "testtest",
    employedSince: new Date("2022-11-01"),
    birthday: new Date("1995-08-30"),
    department: "IT",
  },
  {
    authorisationRole: "user",
    firstName: "Michael",
    lastName: "Wagner",
    addressDetails: {
      street: "Codeweg",
      houseNumber: "101",
      postcode: "34567",
      city: "Programmierhausen",
    },
    contactDetails: {
      phoneNumber: "9876543210",
      onCall: false,
      onCallPhoneNumber: "",
    },
    userName: "user11",
    password: "testtest",
    employedSince: new Date("2023-03-15"),
    birthday: new Date("1993-02-14"),
    department: "IT",
  },
];

async function createMockUsers() {
  try {
    await mongoose.connect("mongodb://localhost:27017/storage");
    // delete existing data
    await User.deleteMany({});

    for (const userData of mockUsers) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const user = new User({
            ...userData,
            password: hashedPassword
        });

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