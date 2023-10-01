import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { improveSolutionMiddleware } from "../middleware/solutionMiddleware.js";

import {
	createSolution,
	updateSolution,
	deleteSolution,
} from "../controllers/solutionController.js";

const router = express.Router();

router.route("/:projectId").post(protect, createSolution);
router
	.route("/:projectId/:solutionId")
	.put(protect, updateSolution)
	.delete(protect, deleteSolution);
router
	.route("/improve/:projectId/:solutionId")
	.post(protect, improveSolutionMiddleware, updateSolution);

export default router;
