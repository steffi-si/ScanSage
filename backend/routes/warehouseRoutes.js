import express from "express";
import Warehouse from "../models/warehouse.js";

const router = express.Router();

// API warehous overview
router.get("/", async (req, res) => {
    try {
        const { city, page = 1, limit = 10 } = req.query;
        const query = {};

        if (city) {
            query.city = city;
        }

        const totalCount = await Warehouse.countDocuments(query);
        const warehouses = await Warehouse.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        res.json({ warehouses, totalCount, page, limit });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API warehouse details
router.get("/:warehouseName", async (req, res) => {
    try {
        const warehouse = await Warehouse.findOne({ warehouseName: req.params.warehouseName });

        if (!warehouse) {
            return res.status(404).json({ message: "Warehouse not found" });
        }

        res.json({ warehouse });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API warehouse capacity summary
router.get("/capacity/summary", async (req, res) => {
    try {
        const warehouse = await Warehouse.find();
        const capacitySummary = warehouse.map(warehouse => ({
            warehouseName: warehouse.warehouseName,
            totalCapacity: warehouse.totalCapacity,
            currentLoad: warehouse.shelves.reduce((total, shelf) => {
                total + shelf.currentLoad, 0
            }),
            availableCapacity: warehouse.totalCapacity - warehouse.shelves.reduce((total, shelf) => {
                total + shelf.currentLoad, 0
            })
        }));

        res.json({ capacitySummary });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;