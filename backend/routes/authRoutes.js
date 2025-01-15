import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

// API Login
router.post("/login", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName: userName });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.authorisationRole },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.json({ token, user: {
            id: user._id,
            userName: user.userName,
            role: user.authorisationRole
        }});
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

// API Logout
router.post("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            await setAsync(`bl_${token}`, "true", "EX", 3600);

            res.json({ message: "Logout successful" });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    } else {
        res.status(400).json({ message: "No token provided" });
    }
});

export default router;