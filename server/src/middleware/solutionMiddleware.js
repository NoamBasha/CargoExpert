import asyncHandler from "express-async-handler";
import { improve } from "../algorithm/algo_js/improve.js";

export const improveSolutionMiddleware = asyncHandler(
	async (req, res, next) => {
		const { boxes, container } = req.body;
		const solution = improve(boxes, container);
		req.solutionData = solution;
		next();
	}
);
