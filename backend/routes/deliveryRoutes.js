import express from "express";
import Delivery from "../models/delivery.js";

const router = express.Router();

// API delivery overview
router.get("/", async (req, res) => {
    try {
        const { status, deliveryVan, assignedUser, page= 1, limit = 10 } = req.query;
        const query = {};

        if (status) {
            query.status = status;
        }
        if (deliveryVan) {
            query.deliveryVan = deliveryVan;
        }
        if (assignedUser) {
            query.assignedUser = assignedUser;
        }

        const totalCount = await Delivery.countDocuments(query);
        const deliveries = await Delivery.find(query)
            .populate("assignedUser products")
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
            .populate("assignedUser products");
        
        if (!delivery) {
            return res.status(404).json({ message: "Delivery not found." })
        }

        res.json({ delivery });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API new delivery
router.post("/", async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API edit delivery
router.put("/:deliveryNumber", async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delete delivery
router.delete("/:deliveryNumber", async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;