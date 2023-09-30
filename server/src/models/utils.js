import mongoose from "mongoose";

export const positionSchema = new mongoose.Schema({
	x: Number,
	y: Number,
	z: Number,
});

export const sizeSchema = new mongoose.Schema({
	width: Number,
	height: Number,
	length: Number,
});
