const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	order: { type: Number, required: false },
	position: { type: [Number], required: false },
	text: { type: String, required: false },
	type: { type: String, required: false },
	color: { type: String, required: false },
	size: { type: [Number], required: false },
	width: { type: Number, required: false },
	height: { type: Number, required: false },
	length: { type: Number, required: false },
	isIn: { type: Number, required: false },
});

const SolutionDataSchema = new mongoose.Schema({
	capacity: { type: Number, required: false },
	number_of_items: { type: Number, required: false },
	order_score: { type: Number, required: false },
	overall_score: { type: Number, required: false },
});

const SolutionSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	boxes: { type: [BoxSchema], required: false },
	name: { type: String, required: false },
	solution_data: { type: SolutionDataSchema, required: false },
});

const ProjectDataSchema = new mongoose.Schema({
	name: { type: String, required: false },
	isQuantity: { type: Number, required: false },
	isQuality: { type: Number, required: false },
});

const ProjectSchema = new mongoose.Schema({
	id: { type: Number, required: false },
	container: { type: [Number], required: false },
	project_data: { type: ProjectDataSchema, required: false },
	boxes: { type: [BoxSchema], required: false },
	solutions: { type: [SolutionSchema], required: false },
});

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: false,
		//unique: true,
		//lowercase: true,
		//validate: [emailSyntax, "Invalid email!"],
	},
	password: {
		type: String,
		//validate: [notEmpty, "Password is required."],
		required: false,
	},
	projects: { type: [ProjectSchema], required: false },
});

function notEmpty(password) {
	return password.trim().length > 0;
}
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailSyntax(email) {
	console.log(email);
	return emailRegex.test(email);
}

const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Box = mongoose.model("Box", BoxSchema);
const Solution = mongoose.model("Solution", SolutionSchema);

module.exports = { User, Project, Box, Solution };

/**
 * 1. set true to some fields
 * 2. add name to project and solution schemas
 * 3. mongoose validation for email and password:
 * 		check password not empty
 * 		check uniqueness for email
 * 		check email validity
 * 4. lowercase email - add field to UserSchema.email 'lowercase: true'.
 *
 * algo:
 * 1. evaluate each solution by metrica
 * 2. to accept solutions with less than 100% success
 * 3. need to add this functionality:
 *      given a list of boxes where each box is signed
 *      with bit if it is in the container or not, load
 *      the container as much as possible to get the best
 *      results
 */
