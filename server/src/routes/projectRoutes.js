import express from "express";

import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:userId").get(protect, getProjects).post(protect, createProject);
router
	.route("/:projectId")
	.put(protect, updateProject)
	.delete(protect, deleteProject);

export default router;
