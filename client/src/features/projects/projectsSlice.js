import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import projectsService from "./projectsService.js";

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
			return await projectsService.getProjects(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const createProject = createAsyncThunk(
	"projects/createProject",
	async (projectData, thunkAPI) => {
		try {
			console.log("21");

			const token = thunkAPI.getState().auth.user.token;
			const userId = thunkAPI.getState().auth.user._id;
			const response = await projectsService.createProject(
				userId,
				projectData,
				token
			);

			console.log("22");
			return response;
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const updateProject = createAsyncThunk(
	"projects/updateProject",
	async ({ projectId, projectData }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.updateProject(
				{ projectId, projectData },
				token
			);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const deleteProject = createAsyncThunk(
	"projects/deleteProject",
	async (projectId, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await projectsService.deleteProject(projectId, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
			return thunkAPI.rejectWithValue(message);
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
				const updatedProjectIndex = state.projects.findIndex(
					(project) => project.id === action.payload.id
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
				state.projects = state.projects.filter(
					(project) => project.id !== action.payload
				);
			})
			.addCase(deleteProject.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			});
	},
});

export const { reset } = projectsSlice.actions;
export default projectsSlice.reducer;

export const selectAllProjects = (state) => state.projects.projects;
