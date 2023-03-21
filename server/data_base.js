const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
	order: { type: Number, required: false },
	position: { type: [Number], required: false },
	text: { type: String, required: false },
	type: { type: String, required: false },
	color: { type: String, required: false },
	size: { type: [Number], required: false },
	width: { type: Number, required: false },
	height: { type: Number, required: false },
	length: { type: Number, required: false },
});

const SolutionDataSchema = new mongoose.Schema({
	capacity: { type: Number, required: false },
	number_of_items: { type: Number, required: false },
});

const SolutionSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	boxes: { type: [BoxSchema], required: false },
	solution_data: { type: SolutionDataSchema, required: false },
});

const ProjectSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	container: { type: [Number], required: false },
	boxes: { type: [BoxSchema], required: false },
	solutions: { type: [SolutionSchema], required: false },
});

const UserSchema = new mongoose.Schema({
	email: { type: String, required: false },
	password: { type: String, required: false },
	projects: { type: [ProjectSchema], required: false },
});

const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Box = mongoose.model("Box", BoxSchema);
const Solution = mongoose.model("Solution", SolutionSchema);

module.exports = { User, Project, Box, Solution };
