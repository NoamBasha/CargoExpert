import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice.js";
import projectsReducer from "../features/projects/projectsSlice.js";
import authReducer from "../features/auth/authSlice.js";
import projectReducer from "../features/project/projectSlice.js";

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		projects: projectsReducer,
		auth: authReducer,
		project: projectReducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(apiSlice.middleware);
	},
	devTools: true,
});
