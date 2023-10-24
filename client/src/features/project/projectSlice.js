import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice.js";

const initialState = {
	projectId: null,
	solutionId: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const projectSlice = createSlice({
	name: "project",
	initialState,
	reducers: {
		setProjectId: (state, action) => {
			state.projectId = action.payload;
		},
		setSolutionId: (state, action) => {
			state.solutionId = action.payload;
		},
		clearCurrentProject: (state) => {
			return initialState;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(logout, () => {
			return initialState;
		});
	},
});

export default projectSlice.reducer;

export const selectProjectId = (state) => state.project.projectId;
export const selectSolutionId = (state) => state.project.solutionId;
