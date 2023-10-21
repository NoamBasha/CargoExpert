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
				url: "/users/register",
				method: "POST",
				body: { ...data },
			}),
		}),
		me: builder.query({
			query: () => ({
				url: "/users/me",
				method: "GET",
			}),
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } =
	authApiSlice;
