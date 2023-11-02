import asyncHandler from "express-async-handler";
import { algo } from "../algorithm/algo_js/algo.js";
import Project from "../models/projectModel.js";

export const getProjects = asyncHandler(async (req, res) => {
	const id = req.params.userId;

	const projects = await Project.find({ user: id });

	if (!projects) {
		res.status(400);
		throw new Error("Projects not found");
	}

	res.status(200).json(projects);
});

export const createProject = asyncHandler(async (req, res) => {
	const { name, boxes, container, isQuantity, isQuality } = req.body;

	const createdProject = await Project.create({
		user: req.params.userId,
		name: name,
		container: container,
		boxes: boxes,
		data: {
			isQuantity,
			isQuality,
		},
	});

	if (!createdProject) {
		res.status(400);
		throw new Error("Couldn't create project");
	}
	const createdBoxes = createdProject.boxes;

	const boxesForAlgo = createdBoxes.map((box) => {
		return {
			id: box._id,
			type: box.type,
			color: box.color,
			size: box.size,
			order: box.order,
			// TODO: isIn needed?
			isIn: false,
		};
	});

	const solutionsData = algo(boxesForAlgo, container, isQuantity, isQuality);

	const solutionsToInsert = solutionsData.map((solution) => {
		return {
			boxes: solution.boxes.map((box) => {
				return {
					boxId: box.id,
					isIn: box.isIn,
					position: box.position,
					rotation: box.rotation,
				};
			}),
			name: solution.name,
			data: solution.data,
		};
	});

	createdProject.solutions = solutionsToInsert;

	createdProject.save();

	res.status(201).json(createdProject);
});

export const deleteProject = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;

	const project = await Project.findById(projectId);

	if (!project) {
		res.status(400);
		throw new Error("Project not found");
	}

	//TODO: delete boxes?
	//TODO: delete solutions?
	// TODO: delete Recursively?
	// Retrieve the list of associated solution IDs
	// const solutions = project.solutions;
	// // Delete all solutions with the retrieved IDs
	// if (solutions.length > 0) {
	// 	await Solution.deleteMany(solutions);
	// }

	// Delete the project itself
	await Project.findByIdAndDelete(projectId);

	res.status(200).send(projectId);
});

export const updateProject = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const { name } = req.body;

	// Find the project by its ID
	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	// Update the project properties
	if (name) project.name = name;

	// Save the updated project
	const updatedProject = await project.save();

	res.status(200).json(updatedProject);
});
