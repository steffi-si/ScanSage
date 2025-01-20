import express from "express";
import User from "../models/user.js";

const router = express.Router();

// API user overview
router.get("/", async (req, res) => {
    try {
        const { role, department, page = 1, limit = 10 } = req.query;
        const query = {};
        const pageNumber = parseInt(page, 10) || 1;
        const limitNumber = parseInt(limit, 10) || 10;

        if (role) {
            query.authorisationRole = role;
        }
        if (department) {
            query.department = department;
        }

        const totalCount = await User.countDocuments(query);
        const users = await User.find(query)
            .limit(limitNumber)
            .skip((pageNumber - 1) * limitNumber)
            .exec();
        
        res.json({ users, totalCount, page, limit });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API user details
router.get("/:personnelNumber", async (req, res) => {
    try {
        const user = await User.findOne({ personnelNumber: req.params.personnelNumber });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API edit user
router.put("/:personnelNumber", async (req, res) => {
    try {
        const updatedUser = await User.findOneAndUpdate(
            { personnelNumber: req.params.personnelNumber },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" })
        }

        res.json({ updatedUser });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API delete user
router.delete("/:personnelNumber", async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ personnelNumber: req.params.personnelNumber });

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// API new user
router.post("/", async (req, res) => {
    try {
        const {
            authorisationRole,
            firstName,
            lastName,
            addressDetails,
            contactDetails,
            userName,
            password,
            employedSince,
            birthday,
            department,
            supervisor
        } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            authorisationRole,
            firstName,
            lastName,
            addressDetails,
            contactDetails,
            userName,
            password: hashedPassword,
            employedSince,
            birthday,
            department,
            supervisor
        });

        const validationError = newUser.validateSync();
        if (validationError) {
            return res.status(400).json({ message: "Validation error", errors: validationError.errors });
        }

        const savedUser = await newUser.save();

        // remove sensitive data befor sending response
        savedUser.password = undefined;

        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: "User with this username or personnel number already exists" });
        }

        res.status(500).json({ message: "Server error", error: err.message });
    }
});

export default router;