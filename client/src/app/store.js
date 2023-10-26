import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.js";
import authReducer from "../features/auth/authSlice.js";
import projectsReducer from "../features/projects/projectsSlice.js";
import projectReducer from "../features/project/projectSlice.js";
import solutionReducer from "../features/solution/solutionSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		auth: authReducer,
		projects: projectsReducer,
		project: projectReducer,
		solution: solutionReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
	devTools: true,
});
