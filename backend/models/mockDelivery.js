import mongoose from "mongoose";
import Delivery from "./delivery.js";

const { ObjectId } = mongoose.Types;

const mockDeliveries = [
    {
        deliveryDate: new Date("2025-01-20T10:00:00Z"),
        deliveryVan: "Van-001",
        assignedUser: "65a123b456c789d012e34f56", // Beispiel User ID
        products: ["65b234c567d890e123f45g67", "65c345d678e901f234g56h78"], // Beispiel Product IDs
        status: "pending",
        deliveryNote: "Bitte klingeln Sie zweimal",
        deliveryAddress: "Musterstraße 1",
        deliveryCity: "Berlin",
        itemsDelivered: 0,
        totalPrice: 150.99,
        totalWeight: 5.5,
        expectedDeliveryTime: new Date("2025-01-20T14:00:00Z"),
        trackingNumber: "TRACK001",
        deliveryInstructions: "Paket beim Nachbarn abgeben, falls nicht zu Hause",
        paymentStatus: "pending",
        deliveryPostcode: "10115",
        deliveryCountry: "Deutschland",
        deliveryContact: "Max Mustermann",
        deliveryPhoneNumber: "+49123456789",
        deliveryEmail: "max@example.com",
        quantity: 2
    },
    {
        deliveryDate: new Date("2025-01-21T09:30:00Z"),
        deliveryVan: "Van-002",
        assignedUser: "65d456e789f901g123h45i67",
        products: ["65e567f890g012h234i56j78"],
        status: "in progress",
        deliveryAddress: "Hauptstraße 50",
        deliveryCity: "München",
        itemsDelivered: 0,
        totalPrice: 79.99,
        totalWeight: 2.3,
        expectedDeliveryTime: new Date("2025-01-21T13:30:00Z"),
        trackingNumber: "TRACK002",
        paymentStatus: "paid",
        deliveryPostcode: "80331",
        deliveryCountry: "Deutschland",
        deliveryContact: "Anna Schmidt",
        deliveryPhoneNumber: "+49987654321",
        quantity: 1
    },
    {
        deliveryDate: new Date("2025-01-22T11:00:00Z"),
        deliveryVan: "Van-003",
        assignedUser: "65f678g901h012i234j56k78",
        products: ["65g789h012i123j345k67l89", "65h890i123j234k456l78m90"],
        status: "delivered",
        deliveryNote: "Großes Paket, bitte vorsichtig behandeln",
        deliveryAddress: "Bahnhofstraße 10",
        deliveryCity: "Hamburg",
        itemsDelivered: 2,
        totalPrice: 299.99,
        totalWeight: 10.2,
        expectedDeliveryTime: new Date("2025-01-22T15:00:00Z"),
        trackingNumber: "TRACK003",
        deliveryInstructions: "Lieferung nur tagsüber möglich",
        paymentStatus: "paid",
        deliveryPostcode: "20095",
        deliveryCountry: "Deutschland",
        deliveryContact: "Lisa Müller",
        deliveryPhoneNumber: "+49555666777",
        deliveryEmail: "lisa@example.com",
        quantity: 2
    },
    {
        deliveryDate: new Date("2025-01-23T08:00:00Z"),
        deliveryVan: "Van-001",
        assignedUser: "65i901j123k234l345m67n89",
        products: ["65j012k234l345m456n78o90"],
        status: "pending",
        deliveryAddress: "Marktplatz 5",
        deliveryCity: "Frankfurt",
        itemsDelivered: 0,
        totalPrice: 49.99,
        totalWeight: 1.1,
        expectedDeliveryTime: new Date("2025-01-23T12:00:00Z"),
        trackingNumber: "TRACK004",
        paymentStatus: "pending",
        deliveryPostcode: "60311",
        deliveryCountry: "Deutschland",
        deliveryContact: "Thomas Weber",
        deliveryPhoneNumber: "+49111222333",
        quantity: 1
    },
    {
        deliveryDate: new Date("2025-01-24T13:00:00Z"),
        deliveryVan: "Van-002",
        assignedUser: "65k123l234m345n456o78p90",
        products: ["65l234m345n456o567p89q01", "65m345n456o567p678q90r12", "65n456o567p678q789r01s23"],
        status: "in progress",
        deliveryNote: "Bitte an der Rezeption abgeben",
        deliveryAddress: "Industrieweg 20",
        deliveryCity: "Stuttgart",
        itemsDelivered: 0,
        totalPrice: 599.97,
        totalWeight: 15.7,
        expectedDeliveryTime: new Date("2025-01-24T17:00:00Z"),
        trackingNumber: "TRACK005",
        deliveryInstructions: "Lieferung nur werktags",
        paymentStatus: "paid",
        deliveryPostcode: "70565",
        deliveryCountry: "Deutschland",
        deliveryContact: "Firma XYZ GmbH",
        deliveryPhoneNumber: "+49999000111",
        deliveryEmail: "info@xyz-gmbh.de",
        quantity: 3
    }
]

async function createMockDeliveries() {
    try {
        await mongoose.connect("mongodb://localhost:27017/storage");
        await Delivery.deleteMany({});

        for (const deliveryData of mockDeliveries) {
            const delivery = new Delivery({
                ...deliveryData,
                products: deliveryData.products.map(id => new ObjectId()),
                assignedUser: new ObjectId()
            });
            await delivery.save();

            console.log(`Created delivery with tracking number: ${delivery.trackingNumber}`);
        }

        console.log("Created mock data successfully.");
    } catch (err) {
        console.error("Error while creating mock data:", err.message);
    } finally {
        mongoose.disconnect();
    }
}

createMockDeliveries();