import express from "express";

import {
	registerUser,
	loginUser,
	getMe,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(loginUser);
router.route("/register").post(registerUser);
router.route("/me").post(protect, getMe);

export default router;
