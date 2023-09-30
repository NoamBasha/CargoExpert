import mongoose from "mongoose";
import { positionSchema } from "./utils.js";

export const solutionSchema = new mongoose.Schema(
	{
		boxes: [
			{
				box: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Box",
					required: true,
				},
				isIn: { type: Boolean, default: false, required: true },
				position: { type: positionSchema, required: true },
			},
		],
		name: { type: String, required: true },
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
