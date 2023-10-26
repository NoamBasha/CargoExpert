import asyncHandler from "express-async-handler";
import { algo } from "../algorithm/algo_js/algo.js";
import User from "../models/userModel.js";
import Project from "../models/projectModel.js";
import Solution from "../models/solutionModel.js";
import Box from "../models/boxModel.js";

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
			isQuantity: isQuantity == 1 ? true : false,
			isQuality: isQuality == 1 ? true : false,
		},
	});

	if (!createdProject) {
		res.status(400);
		throw new Error("Couldn't create project");
	}
	const createdBoxes = createdProject.boxes;

	const createdBoxesAndWHL = createdBoxes.map((box) => {
		return {
			id: box._id,
			type: box.type,
			color: box.color,
			size: {
				width: box.size.width,
				height: box.size.height,
				length: box.size.length,
			},
			order: box.order,
			width: box.size.width,
			height: box.size.height,
			length: box.size.width,
			isIn: 0,
		};
	});

	const solutionsData = algo(
		createdBoxesAndWHL,
		container,
		isQuantity,
		isQuality
	);

	const solutionsToInsert = Object.values(solutionsData).map((solution) => {
		return {
			boxes: solution.boxes.map((box) => {
				return {
					boxId: box.id,
					isIn: box.isIn,
					position: {
						x: box.position[0],
						y: box.position[1],
						z: box.position[2],
					},
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
	const id = req.params.id;

	const project = await Project.findById(id);

	if (!project) {
		res.status(400);
		throw new Error("Project not found");
	}

	// Retrieve the list of associated solution IDs
	const solutions = project.solutions;

	//TODO: delete boxes?

	// Delete all solutions with the retrieved IDs
	await Solution.deleteMany(solutions);

	// Delete the project itself
	await Project.findByIdAndDelete(id);

	res.status(200).send(id);
});

export const updateProject = asyncHandler(async (req, res) => {
	const projectId = req.params.id;
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
