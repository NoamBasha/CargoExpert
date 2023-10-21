import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:1337/api",
	credentials: "same-origin",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: baseQuery,
	tagTypes: ["User", "Project", "Solution"],
	endpoints: (builder) => ({}),
});
