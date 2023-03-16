const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
  order: { type: Number, required: true },
  position: { type: [Number], required: true },
  text: { type: String, required: true },
  color: { type: String, required: true },
  size: { type: [Number], required: true },
});

const SolutionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  boxes: { type: [BoxSchema], required: true },
});

const ProjectSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  container: { type: [Number], required: true },
  boxes: { type: [BoxSchema], required: true },
  solutions: { type: [SolutionSchema], required: true },
});

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  projects: { type: [ProjectSchema], required: true },
});

const User = mongoose.model("User", UserSchema);
const Project = mongoose.model("Project", ProjectSchema);
const Box = mongoose.model("Box", BoxSchema);
const Solution = mongoose.model("Solution", SolutionSchema);

module.exports = { User, Project, Box, Solution };
