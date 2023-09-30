import { algo } from "../algorithm/algo_js/algo.js";
import { improve } from "../algorithm/algo_js/improve.js";

export const getProjects = (req, res) => {
	const id = req.user._id;
	//TODO fix this according to the decided models!

	const user = User.findById(id).populate({
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

	if (!user) {
		res.status(400);
		throw new Error("User not found");
	}

	res.status(200).json({ projects: user.projects });
};

export const getSolutionsJS = (req, res) => {
	try {
		const solutions = algo(req.body);
		res.send(solutions);
	} catch (err) {
		res.status(400).json({ error: Errors.solutionError });
	}
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
