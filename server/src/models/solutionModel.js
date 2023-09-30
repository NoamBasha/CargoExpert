import mongoose from "mongoose";
import { positionSchema } from "./utils.js";
import { boxSchema } from "./boxModel.js";

export const solutionSchema = new mongoose.Schema(
	{
		boxes: [
			{
				box: { type: boxSchema, required: true },
				isIn: { type: Boolean, default: false },
				position: { type: positionSchema, required: true },
			},
		],
		name: { type: String, required: true },
		containerSize: { type: sizeSchema, required: true },
		data: {
			capacity: { type: Number, required: true },
			numberOfItems: { type: Number, required: true },
			orderScore: { type: Number, required: true },
			overallScore: { type: Number, required: true },
		},
	},
	{ timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
