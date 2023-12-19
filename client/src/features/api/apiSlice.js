import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ENV = import.meta.env.VITE_REACT_ENV;
let baseUrl;
if (ENV === "development") {
    baseUrl = import.meta.env.VITE_REACT_DEV_URL;
} else {
    baseUrl = import.meta.env.VITE_REACT_PROD_URL;
}

const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl + "api",
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
    // tagTypes: ["User", "Project", "Solution"],
    endpoints: (builder) => ({}),
});
