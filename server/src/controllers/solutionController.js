import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";
import { improve } from "../algorithm/algo_js/improve.js";
import { orderMetric, overallMetric } from "../algorithm/algo_js/metrics.js";

const getSolutionData = (boxes, container) => {

	let data = {
		numberOfItems: 0,
		capacity: 0,
		orderScore: 0,
		overallScore: 0,
	};
	
	const boxesWithFLB = boxes.map((box) => {
		if (box.isIn === true) {
			data.numberOfItems += 1;
			data.capacity += box.size.width * box.size.height * box.size.length;
		}

		return {
			...box,
			FLB: {
				x: box.position.x - 0.5 * box.size.width,
				y: box.position.y - 0.5 * box.size.height,
				z: box.position.z - 0.5 * box.size.length,
			},
		};
	});

	const inBoxesWithFLB = boxesWithFLB.filter((box) => box.isIn === true);
	data.orderScore = parseFloat(orderMetric(inBoxesWithFLB, container));
	data.overallScore = parseFloat(
		overallMetric(boxesWithFLB, container, data, true)
	);

	return data;
};

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
	const projectId = req.params.projectId;
	let { solutionData } = req.body;
	solutionData = removeIds(solutionData);

	// Replaced creating a mongodb Solution with using the object.
	const solution = solutionData
	// const solution = await Solution.create(solutionData);

	if (!solution) {
		res.status(400);
		throw new Error("Couldn't create solution");
	}

	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	project.solutions.push(solution);

	await project.save();

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
		return solution._id.toString() !== solutionId;
	});

	await project.save();

	res.status(200).send(project);
});

export const updateSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const solutionId = req.params.solutionId;
	const { newSolution } = req.body;

	// Find the project by its ID
	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	const boxes = newSolution.boxes;
	const container = project.container;
	const newData = getSolutionData(boxes, container);

	project.solutions = project.solutions.map((solution) => {
		if (solution._id.toString() === solutionId) {
			return { ...newSolution, data: newData };
		} else {
			return solution;
		}
	});
	await project.save();

	res.status(200).json(project);
});

export const improveSolution = asyncHandler(async (req, res) => {
	const projectId = req.params.projectId;
	const solutionId = req.params.solutionId;
	const { boxes, container } = req.body;
	// Find the project by its ID

	const project = await Project.findById(projectId);

	if (!project) {
		res.status(404);
		throw new Error("Project not found");
	}

	const currentSolution = project.solutions.find((solution) => {
		return solution._id.toString() === solutionId;
	});

	const improvedSolution = improve(
		boxes,
		container,
		currentSolution.name,
		currentSolution._id
	);

	project.solutions = project.solutions.map((solution) => {
		if (solution._id.toString() === solutionId) {
			return improvedSolution;
		} else {
			return solution;
		}
	});

	await project.save();

	res.status(200).json({ project, solutionId });
});
