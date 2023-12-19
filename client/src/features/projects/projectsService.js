import axios from "axios";

const ENV = import.meta.env.VITE_REACT_ENV;
let baseUrl;
if (ENV === "development") {
    baseUrl = import.meta.env.VITE_REACT_DEV_URL;
} else {
    baseUrl = import.meta.env.VITE_REACT_PROD_URL;
}

const API_URL = baseUrl + "api/projects/";

const getProjects = async ({ userId }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(API_URL + userId, config);

    return response.data;
};

const createProject = async ({ userId, projectData }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + userId, projectData, config);

    return response.data;
};

const updateProject = async ({ projectId, newProject }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + projectId, newProject, config);

    return response.data;
};

const deleteProject = async ({ projectId }, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + projectId, config);

    return response.data;
};

const projectsService = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
};

export default projectsService;
