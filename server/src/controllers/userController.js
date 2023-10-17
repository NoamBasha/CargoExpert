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
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error("Invalid credentials");
	}
});

// @desc   Get user data
// @route  POST /api/users/me
// @access Private
export const getMe = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};
