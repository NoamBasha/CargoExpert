const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	order: { type: Number, required: true },
	position: { type: [Number], required: true },
	type: { type: String, required: true },
	color: { type: String, required: true },
	size: { type: [Number], required: true },
	isIn: { type: Number, required: true },
});

const SolutionDataSchema = new mongoose.Schema({
	capacity: { type: Number, required: true },
	number_of_items: { type: Number, required: true },
	order_score: { type: Number, required: true },
	overall_score: { type: Number, required: true },
});

const SolutionSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	boxes: { type: [BoxSchema], required: true },
	name: { type: String, required: true },
	solution_data: { type: SolutionDataSchema, required: true },
});

const ProjectDataSchema = new mongoose.Schema({
	name: { type: String, required: true },
	isQuantity: { type: Number, required: true },
	isQuality: { type: Number, required: true },
});

const ProjectSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	container: { type: [Number], required: true },
	project_data: { type: ProjectDataSchema, required: true },
	boxes: { type: [BoxSchema], required: true },
	solutions: { type: [SolutionSchema], required: true },
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
