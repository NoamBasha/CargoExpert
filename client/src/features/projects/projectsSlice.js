import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectsService from "./projectsService.js";
import {
	updateSolution,
	deleteSolution,
	improveSolution,
	duplicateSolution,
} from "../solution/solutionSlice.js";

import { logout } from "../auth/authSlice.js";

const initialState = {
	projects: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const getProjects = createAsyncThunk(
	"projects/getProjects",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const userId = thunkAPI.getState().auth.user._id;
			return await projectsService.getProjects({userId}, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const createProject = createAsyncThunk(
	"projects/createProject",
	async ({projectData}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const userId = thunkAPI.getState().auth.user._id;
			const response = await projectsService.createProject(
				{userId, projectData}, 
				token
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"projects/updateProject",
	async ({ projectId, newProject }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.updateProject(
				{ projectId, newProject },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const deleteProject = createAsyncThunk(
	"projects/deleteProject",
	async ({projectId}, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.deleteProject({projectId}, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data.message);
		}
	}
);

export const projectsSlice = createSlice({
	name: "projects",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(logout, () => {
				return initialState;
			})
			.addCase(getProjects.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProjects.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.projects = action.payload;
			})
			.addCase(getProjects.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createProject.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createProject.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.projects.push(action.payload);
			})
			.addCase(createProject.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateProject.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateProject.fulfilled, (state, action) => {
				state.isLoading = false;
				const updatedProjectIndex = state.projects.findIndex(
					(project) => project._id === action.payload._id
				);
				if (updatedProjectIndex !== -1) {
					state.projects[updatedProjectIndex] = action.payload;
				}
			})
			.addCase(updateProject.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProject.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteProject.fulfilled, (state, action) => {
				state.isLoading = false;
				state.projects = state.projects.filter(
					(project) => project._id !== action.payload
				);
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(duplicateSolution.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(duplicateSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const projectIdToReplace = action.payload._id;
				state.projects = state.projects.map((project) => {
					if (project._id === projectIdToReplace) {
						return action.payload;
					} else {
						return project;
					}
				});
			})
			.addCase(duplicateSolution.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateSolution.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(updateSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const projectIdToReplace = action.payload._id;
				state.projects = state.projects.map((project) => {
					if (project._id === projectIdToReplace) {
						return action.payload;
					} else {
						return project;
					}
				});
			})
			.addCase(updateSolution.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteSolution.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(deleteSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const projectIdToReplace = action.payload._id;
				state.projects = state.projects.map((project) => {
					if (project._id === projectIdToReplace) {
						return action.payload;
					} else {
						return project;
					}
				});
			})
			.addCase(deleteSolution.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(improveSolution.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(improveSolution.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				const projectIdToReplace = action.payload.project._id;
				state.projects = state.projects.map((project) => {
					if (project._id === projectIdToReplace) {
						return action.payload.project;
					} else {
						return project;
					}
				});
			})
			.addCase(improveSolution.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = projectsSlice.actions;
export default projectsSlice.reducer;

export const selectProjects = (state) => state.projects.projects;
export const selectIsLoading = (state) => state.projects.isLoading;
export const selectIsError = (state) => state.projects.isError;
export const selectMessage = (state) => state.projects.message;
