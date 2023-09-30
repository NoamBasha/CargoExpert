import asyncHandler from "express-async-handler";
import { algo } from "../algorithm/algo_js/algo.js";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Solution from "../models/solutionModel.js";

export const getProject = asyncHandler(async (req, res) => {
	const projectId = req.params.id;

	const project = await Project.findById(projectId).populate({
		path: "solutions",
		model: "Solution",
	});

	if (!project) {
		res.status(400);
		throw new Error("User not found");
	}

	res.status(200).json({ project });
});

export const getProjects = asyncHandler(async (req, res) => {
	const id = req.user._id;

	const user = await User.findById(id).populate({
		path: "projects",
		populate: {
			path: "solutions",
			model: "Solution",
		},
	});

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	res.status(200).json({ projects: user.projects });
});

export const createProject = asyncHandler(async (req, res) => {
	const { name, boxes, containerSize, isQuantity, isQuality } = req.body;

	// This is an array of objects containing everything asolution needs.
	const solutionsData = algo(boxes, containerSize, isQuantity, isQuality);

	// Create solutions first
	const createdSolutions = await Solution.create(solutionsData);

	if (!createdSolutions) {
		res.status(400);
		throw new Error("Couldn't create solutions");
	}

	// Extract the IDs of the created solutions
	const solutionIds = createdSolutions.map((solution) => solution._id);

	// Create the project with references to the solutions
	const createdProject = await Project.create({
		name,
		solutions: solutionIds,
	});

	if (!createdProject) {
		res.status(400);
		throw new Error("Couldn't create project");
	}

	await createdProject.populate({ path: "solutions", model: "Solution" });

	res.status(201).json(createdProject);
});

export const deleteProject = asyncHandler(async (req, res) => {
	const id = req.params.id;

	// Find the project by its ID
	const project = await Project.findById(id);

	if (!project) {
		res.status(400);
		throw new Error("Project not found");
	}

	// Retrieve the list of associated solution IDs
	const solutionIds = project.solutions;

	// Delete all solutions with the retrieved IDs
	await Solution.deleteMany({ _id: { $in: solutionIds } });

	// Delete the project itself
	await Project.findByIdAndDelete(id);

	res.status(200).send(id);
});
