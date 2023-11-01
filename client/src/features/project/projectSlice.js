import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice.js";
import {
	createSolution,
	updateSolution,
	deleteSolution,
	improveSolution,
	duplicateSolution
} from "../solution/solutionSlice.js";

const initialState = {
	projectId: null,
	name: "",
	container: null,
	boxes: [],
	solutions: [],
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjectById: (state, action) => {
			const { projects, projectId } = action.payload;
			const project = projects.find(
				(project) => project._id === projectId
			);
			state.projectId = projectId;
			state.name = project.name;
			state.container = project.container;
			state.boxes = project.boxes;
			state.solutions = project.solutions;
		},
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(logout, () => {
				return initialState;
			})
			.addCase(createSolution.fulfilled, (state, action) => {
				state.solutions = action.payload.solutions;
			})
			.addCase(duplicateSolution.fulfilled, (state, action) => {
				state.solutions = action.payload.solutions;
			})
			.addCase(updateSolution.fulfilled, (state, action) => {
				state.solutions = action.payload.solutions;
			})
			.addCase(deleteSolution.fulfilled, (state, action) => {
				state.solutions = action.payload.solutions;
			})
			.addCase(improveSolution.fulfilled, (state, action) => {
				state.solutions = action.payload.project.solutions;
			});
	},
});

export const { setProjectById, reset } = projectSlice.actions;

export default projectSlice.reducer;

export const selectProjectId = (state) => state.project.projectId;
export const selectProjectName = (state) => state.project.name;
export const selectProjectContainer = (state) => {
	const container = state.project.container
	return {
	width: container.width,
	height: container.height,
	length: container.length
}
};
export const selectProjectBoxes = (state) => state.project.boxes;
export const selectProjectSolutions = (state) => state.project.solutions;
