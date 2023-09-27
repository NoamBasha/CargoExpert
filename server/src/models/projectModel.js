import mongoose from "mongoose";

const projectDataSchema = new mongoose.Schema({
	name: { type: String, required: true },
	isQuantity: { type: Number, required: true },
	isQuality: { type: Number, required: true },
});

export const projectSchema = new mongoose.Schema(
	{
		container: { type: [Number], required: true },
		projectData: { type: projectDataSchema, required: true },
		boxes: { type: [BoxSchema], required: true },
		solutions: { type: [SolutionSchema], required: true },
	},
	{ timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
