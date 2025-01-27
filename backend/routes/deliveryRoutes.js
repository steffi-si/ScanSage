import express from "express";
import Delivery from "../models/delivery.js";

const router = express.Router();

// API delivery overview
router.get("/", async (req, res) => {
    try {
        const { status, deliveryVan, page= 1, limit = 10 } = req.query;
        const query = {};

        if (status) {
            query.status = status;
        }
        if (deliveryVan) {
            query.deliveryVan = deliveryVan;
        }

        const totalCount = await Delivery.countDocuments(query);
        const deliveries = await Delivery.find(query)
            .populate("products")
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .exec();
        
        res.json({ deliveries, totalCount, page, limit });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delivery details
router.get("/:deliveryNumber", async (req, res) => {
    try {
        const delivery = await Delivery.findOne({ deliveryNumber: req.params.deliveryNumber })
            .populate("products");
        
        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." })
        }

        res.json({ delivery });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API edit delivery
router.put("/:deliveryNumber", async (req, res) => {
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            { deliveryNumber: req.params.deliveryNumber },
            req.body,
            { new: true }
        ).populate("products");

        if (!updatedDelivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }

        res.json({ updatedDelivery });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delete delivery
router.delete("/:deliveryNumber", async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findOneAndDelete({ deliveryNumber: req.params.deliveryNumber });

        if (!deletedDelivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }

        res.json({ message: "Delivery deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API new delivery
router.post("/", async (req, res) => {
    try {
        const newDelivery = new Delivery(req.body);

        const validationError = newDelivery.validateSync();
        if (validationError) {
            return res.status(400).json({ message: "Validation error", errors: validationError.errors });
        }

        const savedDelivery = await newDelivery.save();

        res.status(201).json({ message: "Delivery created successfully", delivery: savedDelivery });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "Delivery with this number already exists" })
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// API update delivery status
router.patch("/:deliveryNumber/status", async (req, res) => {
    try {
        const { status } = req.body;
        const updatedDelivery = await Delivery.findOneAndUpdate(
            { deliveryNumber: req.params.deliveryNumber },
            { $set: { status } },
            { new: true }
        ).populate("products");

        if (!updatedDelivery) {
            return res.status(404).json({ message: "Delivery not found." });
        }

        res.json({ updatedDelivery });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;