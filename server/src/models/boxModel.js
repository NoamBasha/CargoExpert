import mongoose from "mongoose";
import { sizeSchema } from "./utils.js";

export const boxSchema = new mongoose.Schema(
	{
		order: { type: Number },
		type: { type: String },
		color: { type: String },
		size: { type: sizeSchema },
	},
	{ _id: true }
);

const Box = mongoose.model("Box", boxSchema);

export default Box;
