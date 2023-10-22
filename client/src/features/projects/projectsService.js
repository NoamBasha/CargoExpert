import axios from "axios";

const API_URL = "http://localhost:1337/api/projects/";

const getProjects = async (userId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.get(API_URL + userId, config);

	return response.data;
};

const createProject = async (userId, projectData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL + userId, projectData, config);

	return response.data;
};

const updateProject = async ({ projectId, projectData }, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.put(API_URL + projectId, projectData, config);

	return response.data;
};

const deleteProject = async (projectId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + projectId, config);

	return response.data;
};

const projectService = {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
};

export default projectService;
