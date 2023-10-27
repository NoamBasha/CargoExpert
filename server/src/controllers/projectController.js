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
			length: box.size.length,
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
	const projectId = req.params.projectId;

	console.log("1");

	const project = await Project.findById(projectId);

	console.log("2");

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

	console.log("3");

	// Delete the project itself
	await Project.findByIdAndDelete(projectId);

	console.log("4");

	res.status(200).send(projectId);
});

export const updateProject = asyncHandler(async (req, res) => {
	console.log(req.params);
	const projectId = req.params.projectId;

	console.log("1");
	const { name } = req.body;
	console.log(req.body);
	console.log("2");
	// Find the project by its ID
	console.log(projectId);
	const project = await Project.findById(projectId);
	console.log("3");
	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}
	console.log("4");
	// Update the project properties
	if (name) project.name = name;
	console.log("5");
	// Save the updated project
	const updatedProject = await project.save();
	console.log("6");
	res.status(200).json(updatedProject);
});
