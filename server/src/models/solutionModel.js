import mongoose from "mongoose";

const solutionDataSchema = new mongoose.Schema({
	capacity: { type: Number, required: true },
	numberOfItems: { type: Number, required: true },
	orderScore: { type: Number, required: true },
	overallScore: { type: Number, required: true },
});

const solutionSchema = new mongoose.Schema(
	{
		boxes: { type: [BoxSchema], required: true },
		name: { type: String, required: true },
		solutionData: { type: solutionDataSchema, required: true },
	},
	{ timestamps: true }
);

const Solution = mongoose.model("Solution", solutionSchema);

export default Solution;
