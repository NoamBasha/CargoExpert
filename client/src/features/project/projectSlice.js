import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice.js";

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
			const projectId = action.payload;
			const projects = state.projects.projects;
			const project = projects.find(
				(project) => project.id === projectId
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
		builder.addCase(logout, () => {
			return initialState;
		});
	},
});

export const { setProjectById } = projectSlice.actions;

export default projectSlice.reducer;

export const selectProjectId = (state) => state.project.projectId;
export const selectProjectName = (state) => state.project.name;
export const selectProjectContainer = (state) => state.project.container;
export const selectProjectBoxes = (state) => state.project.boxes;
export const selectProjectSolutions = (state) => state.project.solutions;
