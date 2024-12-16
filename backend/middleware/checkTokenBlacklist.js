import { getAsync } from "../utils/redis.js";

export const checkTokenBlacklist = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
        try {
            const isBlacklisted = await getAsync(`bl_${token}`);

            if (isBlacklisted) {
                return res.status(401).json({ message: "Token is no longer valid" });
            }
        } catch (err) {
            console.error("Redis error:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    next();
};