import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import deliveryRoutes from "./routes/deliveryRoutes.js";
import warehousRoutes from "./routes/warehouseRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/warehouses", warehousRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))