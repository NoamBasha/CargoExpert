import { apiSlice } from "../api/apiSlice.js";

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: "/users/login",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		register: builder.mutation({
			query: (data) => ({
				url: "/users/",
				method: "POST",
				body: { ...data },
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
