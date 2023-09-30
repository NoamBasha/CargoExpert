import express from "express";

import {
	getProject,
	getProjects,
	createProject,
	deleteProject,
} from "../controllers/projectController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getProjects).post(protect, createProject);
router.route("/:id").get(protect, getProject).delete(protect, deleteProject);

export default router;
