import mongoose from "mongoose";
import { projectSchema } from "./projectModel";

const userSchema = new mongoose.Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		projects: { type: [projectSchema], required: true },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
