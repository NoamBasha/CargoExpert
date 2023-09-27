import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
	x: Number,
	y: Number,
	z: Number,
});

const sizeSchema = new mongoose.Schema({
	width: Number,
	height: Number,
	length: Number,
});

const boxSchema = new mongoose.Schema(
	{
		order: { type: Number, required: true },
		position: { type: positionSchema, required: true },
		type: { type: String, required: true },
		color: { type: String, required: true },
		size: { type: sizeSchema, required: true },
		isIn: { type: Number, required: true },
	},
	{ timestamps: true }
);

const Box = mongoose.model("Box", boxSchema);

export default Box;
