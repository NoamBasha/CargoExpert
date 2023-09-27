import bcrypt from "bcryptjs";
import { User } from "../models/data_base.js";

const Errors = {
	solutionError: "Could not get solutions",
	improveError: "There was a problem improving your solution",
	downloadFileError:
		"Can't download file at this time. Please try again later",
	emailError: "Email already exists",
	loginError: "Invalid login credentials",
	userError: "Invalid user",
};

export const createUser = async (req, res) => {
	try {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(
			req.body.password.trim(),
			saltRounds
		);

		await User.create({
			email: req.body.email.trim(),
			password: hashedPassword,
		});
		res.sendStatus(200);
	} catch (err) {
		if (err.message.includes("duplicate key error")) {
			res.status(400).json({
				error: Errors.emailError,
			});
		} else {
			res.status(400).json({
				error: "Server / Database error",
			});
		}
		// if (err.errors.email) {
		// 	const emailError = err.errors.email.properties.message;
		// 	if (emailError) {
		// 		res.status(400).json({
		// 			error: emailError,
		// 		});
		// 	}
		// }
		// if (err.errors.password) {
		// 	console.log(err.errors);
		// 	const passwordError = err.errors.password.properties.message;
		// 	console.log(passwordError);
		// 	if (passwordError) {
		// 		res.status(400).json({
		// 			error: passwordError,
		// 		});
		// 	}
		// }
	}
};

export const readUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			const isPasswordValid = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (isPasswordValid) {
				res.status(200).json(user.projects);
			} else {
				res.status(400).json({
					error: Errors.loginError,
				});
			}
		} else {
			res.status(400).json({
				error: Errors.loginError,
			});
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			const isPasswordValid = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (isPasswordValid) {
				await User.deleteOne({ email: req.body.email });
				res.sendStatus(200);
			} else {
				res.status(400).json({
					error: Errors.deleteUserError,
				});
			}
		} else {
			res.status(400).json({
				error: Errors.deleteUserError,
			});
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export const updateUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			const isPasswordValid = await bcrypt.compare(
				req.body.password,
				user.password
			);

			if (isPasswordValid) {
				user.projects = req.body.newProjects;

				await user.populate({
					path: "projects",
					populate: {
						path: "boxes",
						model: "Box",
						path: "solutions",
						populate: {
							path: "boxes",
							model: "Box",
						},
					},
				});

				await user.save();

				res.sendStatus(200);
			} else {
				res.status(400).json({ error: Errors.userError });
			}
		} else {
			res.status(400).json({ error: Errors.userError });
		}
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};
