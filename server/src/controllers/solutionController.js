import asyncHandler from "express-async-handler";
import Solution from "../models/solutionModel.js";
import Project from "../models/projectModel.js";

export const createSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;

	const { solutionData } = req.body;

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

	const solutionIndex = project.solutions.findIndex(
		(id) => id.toString() === solutionId
	);

	if (solutionIndex === -1) {
		res.status(404);
		throw new Error("Solution not found within the project");
	}

	project.solutions.splice(solutionIndex, 1);

	await project.save();

	//await Solution.findByIdAndDelete(solutionId);

	res.status(200).send(project);
});

// TODO: fix this.
export const updateSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const solutionId = req.params.solutionId;
	const solutionData = req.body;

	// Find the project by its ID
	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	// Check if the project contains the specified solution
	const solution = await Solution.findById(solutionId);

	if (!solution) {
		res.status(404);
		throw new Error("Solution not found");
	}

	// Update the solution's data
	solution.set(updatedSolutionData);

	// Save the updated solution
	await solution.save();

	res.status(200).json(project);
});
