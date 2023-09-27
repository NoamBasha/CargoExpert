import { algo } from "./algorithm/algo_js/algo.js";
import { improve } from "./algorithm/algo_js/improve.js";

import path from "path";

import * as PythonShellLibrary from "python-shell";
let { PythonShell } = PythonShellLibrary;

import bcrypt from "bcryptjs";

import { User } from "./models/data_base.js";

const Paths = {
	pythonAlgorithmPath: "/algo_py/algo.py",
	pythonAlgorithmTwoPath: "/algo2_py/algo.py",
	pythonImprovePath: "src\\algo_py\\improve.py",
	downloadFilePath: "./user_input_example.csv",
};

const Errors = {
	solutionError: "Could not get solutions",
	improveError: "There was a problem improving your solution",
	downloadFileError:
		"Can't download file at this time. Please try again later",
	emailError: "Email already exists",
	loginError: "Invalid login credentials",
	userError: "Invalid user",
};

export const parse_response_from_algo = (result) => {
	result_string = result[0];
	result_string = result_string.replace(/ /g, "");
	result_string = result_string.replace(/'/g, '"');
	result_json = JSON.parse(result_string);
	return result_json;
};

export const getSolutions = (req, res) => {
	const scriptPath = path.join(__dirname, Paths.pythonAlgorithmPath);
	options = {
		args: [JSON.stringify(req.body)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};
	PythonShell.run(scriptPath, options, function (err, result) {
		if (err) {
			console.log(err.traceback);
		} else {
			result = parse_response_from_algo(result);
			res.send(result);
		}
	});
};

export const getSolutionsJS = (req, res) => {
	try {
		console.log(req.body);
		const solutions = algo(req.body);
		res.send(solutions);
	} catch (err) {
		res.status(400).json({ error: Errors.solutionError });
	}
};

export const getSolutions2 = (req, res) => {
	const scriptPath = path.join(__dirname, Paths.pythonAlgorithmTwoPath);
	options = {
		args: [JSON.stringify(req.body)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};
	PythonShell.run(scriptPath, options, function (err, result) {
		if (err) {
			console.log(err.traceback);
		} else {
			result = parse_response_from_algo(result);
			res.send(result);
		}
	});
};

export const improveSolution = (req, res) => {
	options = {
		args: [JSON.stringify(req.body)],
		pythonOptions: ["-u"], // The '-u' tells Python to flush every time // get print results in real-time
	};
	PythonShell.run(Paths.pythonImprovePath, options, function (err, result) {
		if (err) {
			console.log(err);
		} else {
			result = parse_response_from_algo(result);
			res.send(result);
		}
	});
};

export const improveSolutionJS = (req, res) => {
	try {
		const solutions = improve(req.body);
		res.send(solutions);
	} catch (err) {
		res.status(400).json({
			error: Errors.improveError,
		});
	}
};

export const userInputExample = (req, res) => {
	try {
		res.download(Paths.downloadFilePath);
	} catch (err) {
		res.status(400).json({
			error: Errors.downloadFileError,
		});
	}
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
				await user
					.populate({
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
					})
					.execPopulate();
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

export const serverListen = (port) => {
	console.log(`listening on port ${port}`);
};
