import express from "express";

import {
	createUser,
	readUser,
	deleteUser,
	updateUser,
} from "../controllers/userController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/createUser").post((req, res) => createUser(req, res));
router.route("/readUser").post((req, res) => readUser(req, res));
router.route("/deleteUser").post((req, res) => deleteUser(req, res));
router.route("/updateUser").post((req, res) => updateUser(req, res));

export default router;
