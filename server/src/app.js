import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend port
    credentials: true, // Important for cookies
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => res.json({ message: "Hello from backend" }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

export default app;
