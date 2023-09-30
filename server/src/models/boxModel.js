import mongoose from "mongoose";
import { sizeSchema } from "./utils.js";

export const boxSchema = new mongoose.Schema({
	order: { type: Number, required: true },
	type: { type: String, required: true },
	color: { type: String, required: true },
	size: { type: sizeSchema, required: true },
});

const Box = mongoose.model("Box", boxSchema);

export default Box;
