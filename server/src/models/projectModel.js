import mongoose from "mongoose";
import { sizeSchema } from "./utils.js";

export const projectSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		solutions: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Solution",
				required: true,
			},
		],
		// boxes: [
		// 	{
		// 		type: mongoose.Schema.Types.ObjectId,
		// 		ref: "Box",
		// 		required: true,
		// 	},
		// ],
		// isQuantity: { type: Boolean, default: false, required: true },
		// isQuality: { type: Boolean, default: false, required: true },
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
