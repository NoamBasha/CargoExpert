import { apiSlice } from "../../app/api/apiSlice";

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: () => "/projects",
			keepUnusedDataFor: 60,
		}),
	}),
});

export const { useGetProjectsQuery } = usersApiSlice;
