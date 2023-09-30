import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
	getSolution,
	createSolution,
	updateSolution,
	deleteSolution,
} from "../controllers/solutionController.js";

const router = express.Router();

router.route("/").get(protect, getSolution).post(protect, createSolution);
router
	.route("/:projectId/:solutionId")
	.put(protect, updateSolution)
	.delete(protect, deleteSolution);

export default router;
