import express from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";

import { getCourses } from "../controllers/user.controller.js";
import { getCourseDetails } from "../controllers/user.controller.js";
import { toggleMaterialCompletion } from "../controllers/user.controller.js";

const router = express.Router();

// Api 1
router.get("/courses", authMiddleware, getCourses);
// Api 2
router.get("/courses/:courseId", authMiddleware, getCourseDetails);
// Api 3
router.patch(
  "/materials/:materialId",
  authMiddleware,
  toggleMaterialCompletion
);

export default router;
