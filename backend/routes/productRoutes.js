import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Middleware -> Check if user is supervisor
const isSupervisor = (req, res, next) => {
    if (req.user && req.user.role === "supervisor") {
        next();
    } else {
        res.status(403).send({ message: "You are not authorized to perform this action." });
    }
};

// API product overview
router.get("/", async (req, res) => {
    try {
        const { category, name, status, barcode, page = 1, limit = 10 } = req.query;
        const query = {};

        if (category) {
            query.category = category;
        }
        if (barcode) {
            query["barcode.value"] = barcode;
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
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
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
router.put("/:productNumber", isSupervisor, async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productNumber: req.params.productNumber },
            req.body,
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
router.delete("/:productNumber", isSupervisor, async (req, res) => {
    try {
        const deletedProduct = await Product.findOneAndDelete({ productNumber: req.params.productNumber });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// // API edit barcode
// router.patch("/:productNumber/barcode", async (req, res) => {
//     try {
//         const { value, format } = req.body;
//         const updatedProduct = await Product.findOneAndUpdate(
//             { productNumber: req.params.productNumber },
//             {
//                 $set: {
//                     "barcode.value": value,
//                     "barcode.format": format,
//                     "barcode.lastScanned": new Date()
//                 }
//             },
//             { new: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ message: "Product not found" });
//         }

//         res.json({ updatedProduct });
//     } catch (err) {
//         res.status(500).json({ message: "Server error" });
//     }
// });

// API simulate scan
router.post("/:productNumber/scan", async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productNumber: req.params.productNumber },
            { $set: { "barcode.lastScanned": new Date() } },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Barcode scanned successfully", product: updatedProduct });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API new product with barcode
router.post("/", isSupervisor, async (req, res) => {
    try {
        const { barcode, ...productData } = req.body;

        // check: barcode available?
        if (!barcode || !barcode.value) {
            return res.status(400).json({ message: "Barcode data ist required" });
        }

        const newProduct = new Product({
            ...productData,
            barcode: {
                value: barcode.value,
                format: barcode.format,
                lastScanned: new Date()
            }
        });

        // validation
        const validationError = newProduct.validateSync();
        if (validationError) {
            return res.status(400).json({ message: "Validation error", errors: validationError.errors });
        }

        // Save new product
        const savedProduct = await newProduct.save();

        res.status(201).json({ message: "Product created successfully", product: savedProduct });
    } catch (err) {
        // Error with duplicate key (probably for productNumber or barcode value)
        if (err.code === 11000) {
            return res.status(400).json({ message: "Product with this number or barcode already exists" });
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;