import express from "express";

import {
	getSolutionsJS,
	improveSolutionJS,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getProjects).post(protect, createProject);
router.route("/:id").put(protect, updateProject).delete(protect, deleteProject);

// router.route("/getSolutionsJS").post(getSolutionsJS);
// router.route("/improveSolutionJS").post(improveSolutionJS);

export default router;
