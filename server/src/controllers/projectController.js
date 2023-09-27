import { algo } from "../algorithm/algo_js/algo.js";
import { improve } from "../algorithm/algo_js/improve.js";

import path from "path";

import * as PythonShellLibrary from "python-shell";
let { PythonShell } = PythonShellLibrary;

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
