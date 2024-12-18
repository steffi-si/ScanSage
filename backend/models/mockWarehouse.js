import Warehouse from "./warehouse.js";
import User from "./user.js";
import Product from "./product.js";
import Delivery from "./delivery.js";
import mongoose from "mongoose";

const mockWarehouses = [
    {
        warehouseName: "Main Warehouse",
        address: "123 Warehouse St",
        city: "Storage City",
        shelves: [
            { capacity: 100, currentLoad: 50, isFragile: false, isExpress: false },
            { capacity: 200, currentLoad: 150, isFragile: true, isExpress: true },
        ],
        totalCapacity: 500,
    },
    {
        warehouseName: "Secondary Warehouse",
        address: "456 Storage Ave",
        city: "Logistics Town",
        shelves: [
            { capacity: 150, currentLoad: 75, isFragile: false, isExpress: true },
            { capacity: 250, currentLoad: 100, isFragile: false, isExpress: false },
        ],
        totalCapacity: 600,
    }
];

async function createMockWarehouses() {
    try {
        await mongoose.connect('mongodb://localhost:27017/storage');
        
        await Warehouse.deleteMany({});

        const user = await User.findOne({ userName: "user" });
        const manager = await User.findOne({ userName: "manager" });
        const product = await Product.findOne(); // Annahme: Sie haben mindestens ein Produkt

        for (const warehouseData of mockWarehouses) {
            const delivery = new Delivery({
                deliveryDate: new Date("2024-01-01"),
                deliveryVan: "Van123",
                assignedUser: user._id,
                products: [product._id],
                status: "pending",
                deliveryAddress: "123 Delivery St",
                deliveryCity: "Delivery City",
                itemsDelivered: 10,
                quantity: 10 
            });

            await delivery.save();

            const warehouse = new Warehouse({
                ...warehouseData,
                assignedUser: [user._id, manager._id],
                deliveryList: [delivery._id]
            });

            await warehouse.save();
            console.log(`Created warehouse: ${warehouse.warehouseName}`);
        }

        console.log("Mock warehouses created successfully");
    } catch (err) {
        console.error("Error creating mock warehouses:", err.message);
    } finally {
        mongoose.disconnect();
    }
}

createMockWarehouses();