import express from "express";
import Product from "../models/product.js";
import User from "../models/user.js";

const router = express.Router();

// Middleware 
const authMiddleware = async (req, res, next) => {
    try {
        // extract token from authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find user in database
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: "Access denied. User not found." });
        }

        // add user to req obj
        req.user = user;

        // send user information in the response (conerted to a plain js obj)
        res.locals.user = user.toObject()

        next();
    } catch (err) {
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Access denied. Invalid token." });
        }
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access denied. Token expired." });
        }
        return res.status(500).json({ message: "Server error." });
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
router.put("/:productNumber", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "supervisor") {
            return res.status(403).json({ message: "Access denied."})
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { productNumber: req.params.productNumber },
            req.body,
            { new: true }
        )

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ 
            updatedProduct,
            user: res.locals.user 
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delete product
router.delete("/:productNumber", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "supervisor") {
            return res.status(403).json({ message: "Access denied."})
        }

        const deletedProduct = await Product.findOneAndDelete({ productNumber: req.params.productNumber });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ 
            message: "Product deleted successfully",
            user: res.locals.user
        });
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
router.post("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role !== "supervisor") {
            return res.status(403).json({ message: "Access denied."})
        }

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

        res.status(201).json({ 
            message: "Product created successfully", 
            product: savedProduct,
            user: res.locals.user
        });
    } catch (err) {
        // Error with duplicate key (probably for productNumber or barcode value)
        if (err.code === 11000) {
            return res.status(400).json({ message: "Product with this number or barcode already exists" });
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;