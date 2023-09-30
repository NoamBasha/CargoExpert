import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// @desc   Register a new user
// @route  POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		res.status(400);
		throw new Error("Please fill all fields");
	}

	const isUserExists = await User.findOne({ email: email });

	if (isUserExists) {
		res.status(400);
		throw new Error("Email already exists");
	}

	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);

	const user = User.create({
		name: name,
		email: email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			projects: user.projects,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc   Authenticate a user
// @route  GET /api/users/login
// @access Public
export const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400);
		throw new Error("Please fill all fields");
	}

	const user = await User.findOne({ email: email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.status(200).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			projects: user.projects,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

// @desc   Get user data
// @route  POST /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// export const deleteUser = async (req, res) => {
// 	try {
// 		const user = await User.findOne({ email: req.body.email });

// 		if (user) {
// 			const isPasswordValid = await bcrypt.compare(
// 				req.body.password,
// 				user.password
// 			);

// 			if (isPasswordValid) {
// 				await User.deleteOne({ email: req.body.email });
// 				res.sendStatus(200);
// 			} else {
// 				res.status(400).json({
// 					error: Errors.deleteUserError,
// 				});
// 			}
// 		} else {
// 			res.status(400).json({
// 				error: Errors.deleteUserError,
// 			});
// 		}
// 	} catch (err) {
// 		res.status(400).json({ error: err.message });
// 	}
// };

// export const updateUser = async (req, res) => {
// 	try {
// 		const user = await User.findOne({ email: req.body.email });

// 		if (user) {
// 			const isPasswordValid = await bcrypt.compare(
// 				req.body.password,
// 				user.password
// 			);

// 			if (isPasswordValid) {
// 				user.projects = req.body.newProjects;

// 				await user.populate({
// 					path: "projects",
// 					populate: {
// 						path: "boxes",
// 						model: "Box",
// 						path: "solutions",
// 						populate: {
// 							path: "boxes",
// 							model: "Box",
// 						},
// 					},
// 				});

// 				await user.save();

// 				res.sendStatus(200);
// 			} else {
// 				res.status(400).json({ error: Errors.userError });
// 			}
// 		} else {
// 			res.status(400).json({ error: Errors.userError });
// 		}
// 	} catch (err) {
// 		res.status(400).json({ error: err.message });
// 	}
// };

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
