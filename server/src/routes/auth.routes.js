import express from "express";

import { check, login, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/check", authMiddleware, check);
router.post("/logout", authMiddleware, logout);

// router.get("/test", authMiddleware, (req, res) => {
//   res.status(200).json({ message: "middleware working", user: req.user });
// });

export default router;
