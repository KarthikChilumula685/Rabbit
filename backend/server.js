import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoute.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import subsciberRoutes from "./routes/subscriberRoute.js";
import adminRoutes from "./routes/adminRoutes.js";
import productAdminRoutes from "./routes/productAdminRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";

/* =====================
   ENV CONFIG (TOP)
===================== */
config();

/* =====================
   APP INIT
===================== */
const app = express();

/* =====================
   MIDDLEWARES
===================== */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://rabbit-n685.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ REQUIRED FOR PREFLIGHT REQUESTS


/* =====================
   DATABASE
===================== */
connectDB();

/* =====================
   HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.status(200).send("WELCOME TO RABBIT API!");
});

/* =====================
   ROUTES
===================== */
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subsciberRoutes);

// Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

/* =====================
   EXPORT (IMPORTANT)
===================== */
export default app;
