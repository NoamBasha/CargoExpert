import mongoose from "mongoose";
import { sizeSchema } from "./utils.js";
import { boxSchema } from "./boxModel.js";
import { solutionSchema } from "./solutionModel.js";

const MAX_SOLUTIONS = 20;

export const projectSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
		name: { type: String, required: true },
		container: { type: sizeSchema, required: true },
		boxes: { type: [boxSchema], required: true },
		solutions: { type: [solutionSchema], required: true },
		data: {
			isQuantity: { type: Boolean, default: false, required: true },
			isQuality: { type: Boolean, default: false, required: true },
		},
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
