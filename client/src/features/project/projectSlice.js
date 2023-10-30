import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice.js";
import {
	createSolution,
	updateSolution,
	deleteSolution,
	improveSolution,
} from "../solution/solutionSlice.js";

const initialState = {
	projectId: null,
	name: "",
	container: null,
	boxes: [],
	solutions: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
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
				state.isLoading = false;
				state.isSuccess = true;
				state.solutions = action.payload.solutions;
			})
			.addCase(updateSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.solutions = action.payload.solutions;
			})
			.addCase(deleteSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.solutions = action.payload.solutions;
			})
			.addCase(improveSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.solutions = action.payload.project.solutions;
			});
	},
});

export const { setProjectById, reset } = projectSlice.actions;

export default projectSlice.reducer;

export const selectProjectId = (state) => state.project.projectId;
export const selectProjectName = (state) => state.project.name;
export const selectProjectContainer = (state) => state.project.container;
export const selectProjectBoxes = (state) => state.project.boxes;
export const selectProjectSolutions = (state) => state.project.solutions;
