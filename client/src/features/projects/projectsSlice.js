import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectsService from "./projectsService.js";
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
			return await projectsService.getProjects(userId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const createProject = createAsyncThunk(
	"projects/createProject",
	async (projectData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			const userId = thunkAPI.getState().auth.user._id;
			const response = await projectsService.createProject(
				userId,
				projectData,
				token
			);
			return response;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"projects/updateProject",
	async ({ projectId, newProject }, thunkAPI) => {
		try {
			console.log(projectId);
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.updateProject(
				{ projectId, newProject },
				token
			);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const deleteProject = createAsyncThunk(
	"projects/deleteProject",
	async (projectId, thunkAPI) => {
		try {
			console.log(projectId);
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.deleteProject(projectId, token);
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message);
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
				console.log(action.payload);
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
			.addCase(logout, () => {
				return initialState;
			});
	},
});

export const { reset } = projectsSlice.actions;
export default projectsSlice.reducer;

export const selectProjects = (state) => state.projects.projects;
export const selectIsLoading = (state) => state.projects.isLoading;
export const selectIsError = (state) => state.projects.isError;
export const selectMessage = (state) => state.projects.message;
// export const selectProjectById = (state, projectId) => {
// 	return state.projects.projects.find((project) => project.id === projectId);
// };
