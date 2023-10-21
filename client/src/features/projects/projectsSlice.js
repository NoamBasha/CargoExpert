import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
	useGetProjectsQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
} from "./projectsApiSlice.js";

const initialState = {
	projects: [],
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

// Define an async thunk for fetching projects
export const getProjects = createAsyncThunk(
	"projects/getProjects",
	async (_, thunkAPI) => {
		try {
			const response = await useGetProjectsQuery(); // Use the query from projectsApiSlice
			return response.data; // Assuming the response has a "data" property with projects
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

// Define an async thunk for creating a project
export const createNewProject = createAsyncThunk(
	"projects/createNewProject",
	async (projectData, thunkAPI) => {
		try {
			console.log("21");

			const response = await thunkAPI.dispatch(
				useCreateProjectMutation(projectData)
			); // Use the mutation from projectsApiSlice
			console.log("22");

			return response.data; // Assuming the response has a "data" property with the newly created project
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

// Define an async thunk for updating a project
export const updateProject = createAsyncThunk(
	"projects/updateProject",
	async ({ projectId, projectData }, thunkAPI) => {
		try {
			const response = await useUpdateProjectMutation({
				projectId,
				projectData,
			}); // Use the mutation from projectsApiSlice
			return response.data; // Assuming the response has a "data" property with the updated project
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

// Define an async thunk for deleting a project
export const deleteProject = createAsyncThunk(
	"projects/deleteProject",
	async (projectId, thunkAPI) => {
		try {
			await useDeleteProjectMutation(projectId); // Use the mutation from projectsApiSlice
			return projectId; // Return the ID of the deleted project
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
		//
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
			.addCase(createNewProject.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(createNewProject.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.goals.push(action.payload);
			})
			.addCase(createNewProject.rejected, (state, action) => {
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

export default projectsSlice.reducer;
