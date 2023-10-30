import asyncHandler from "express-async-handler";
import Solution from "../models/solutionModel.js";
import Project from "../models/projectModel.js";

const removeIds = (obj) => {
	if (typeof obj === "object") {
		for (const key in obj) {
			if (key === "_id") {
				delete obj[key];
			} else if (typeof obj[key] === "object") {
				removeIds(obj[key]);
			}
		}
	}
	return obj;
};

export const createSolution = asyncHandler(async (req, res) => {
	console.log("Creating solution...");
	const projectId = req.params.projectId;
	let { solutionData } = req.body;
	solutionData = removeIds(solutionData);

	const solution = await Solution.create(solutionData);

	if (!solution) {
		res.status(400);
		throw new Error("Couldn't create solution");
	}

	// Find the project by its ID
	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	project.solutions.push(solution);

	await project.save();

	// TODO send project or solution?
	res.status(201).json(project);
});

export const deleteSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const solutionId = req.params.solutionId;

	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	project.solutions = project.solutions.filter((solution) => {
		//TODO != because one is a string and the other is an object
		return solution._id != solutionId;
	});

	await project.save();

	res.status(200).send(project);
});

// TODO: fix this.
export const updateSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const solutionId = req.params.solutionId;
	const { newSolution } = req.body;
	console.log(newSolution);
	console.log(projectId, solutionId);
	// Find the project by its ID
	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}
	console.log(project);
	project.solutions = project.solutions.map((solution) => {
		//TODO == because one is a string and the other is an object
		if (solution._id == solutionId) {
			return newSolution;
		} else {
			return solution;
		}
	});
	await project.save();

	res.status(200).json(project);
});
