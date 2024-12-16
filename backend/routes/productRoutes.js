import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// API product overview
router.get("/", async (req, res) => {
    try {
        const { category, name, status, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }
        // Regular expression with i-flag (to ignore upper and lower case)
        if (name) { 
            query.name = new RegExp(name, "i");
        }
        if (status) { 
            query.status = status;
        }

        const totalCount = await Product.countDocuments(query);
        const products = await Product.find(query)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            // Return of a real promise
            .exec();
        
        res.json({ products, totalCount, page, limit });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API product details
router.get("/:productNumber", async (req, res) => {
    try {
        const product = await Product.findOne({ productNumber: req.params.productNumber });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ product });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API edit product
router.put("/:productNumber", async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productNumber: req.params.productNumber },
            // Return of the modified product
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delete product
router.delete("/:productNumber", async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productNumber: req.params.productNumber });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Prooduct not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API new product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);

        // Validate new product
        const validationError = newProduct.validationSynch();
        if (validationError) {
            return res.status(400).json({ message: "Validation error", errors: validationError.errors });
        }

        // Save new product
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error (likely for productNumber)
            return res.status(400).json({ message: "Product with this number already exists" });
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;