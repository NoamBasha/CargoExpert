import express from "express";

import {
	getSolutionsJS,
	improveSolutionJS,
} from "../controllers/projectController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/getSolutionsJS").post((req, res) => getSolutionsJS(req, res));
router
	.route("/improveSolutionJS")
	.post((req, res) => improveSolutionJS(req, res));

export default router;
