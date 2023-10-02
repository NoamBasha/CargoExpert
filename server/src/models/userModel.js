import mongoose from "mongoose";

const MAX_PROJECTS = 20;

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		projects: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Project",
				default: [],
				validate: {
					validator: function (arr) {
						return arr.length <= MAX_PROJECTS;
					},
					message: `The array can have a maximum of ${MAX_PROJECTS} elements.`,
				},
			},
		],
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
