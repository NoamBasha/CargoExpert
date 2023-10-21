import { apiSlice } from "../api/apiSlice.js";

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProjects: builder.query({
			query: ({}, { getState }) => {
				const userId = getState().user._id;
				return {
					url: `/projects/${userId}`,
					method: "GET",
				};
			},
			//providesTags: ["Project"],
		}),
		createProject: builder.mutation({
			query: (projectData, { getState }) => {
				console.log("3");

				const userId = getState().user._id;
				console.log("4");

				return {
					url: `/projects/${userId}`,
					method: "POST",
					body: projectData,
				};
			},
			//invalidatesTags: ["Project"],
		}),
		updateProject: builder.mutation({
			query: ({ projectId, projectData }, { getState }) => {
				const userId = getState().user._id;
				return {
					url: `/projects/${userId}/${projectId}`,
					method: "PUT",
					body: projectData,
				};
			},
			//invalidatesTags: ["Project"],
		}),
		deleteProject: builder.mutation({
			query: (projectId, { getState }) => {
				const userId = getState().user._id;
				return {
					url: `/projects/${userId}/${projectId}`,
					method: "DELETE",
				};
			},
			//invalidatesTags: ["Project"],
		}),
	}),
});

export const {
	useGetProjectsQuery,
	useCreateProjectMutation,
	useUpdateProjectMutation,
	useDeleteProjectMutation,
} = projectsApiSlice;
