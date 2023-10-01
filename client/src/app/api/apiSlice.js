import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:1337/api",
	// credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
});

// const baseQueryWithReauth = async (args, api, extraOptions) => {

// }

export const apiSlice = createApi({
	baseQuery: baseQuery,
	endpoints: (builder) => ({}),
});
