import axios from "axios";

const API_URL = "http://localhost:1337/api/solutions/";

const createSolution = async ({projectId, solutionData}, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const response = await axios.post(
		API_URL + projectId,
		{ solutionData: solutionData },
		config
	);

	return response.data;
};

const updateSolution = async (
	{ solutionId, newSolution, projectId },
	token
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(
		API_URL + projectId + "/" + solutionId,
		{ newSolution: newSolution },
		config
	);

	return response.data;
};

const deleteSolution = async ({ solutionId, projectId }, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(
		API_URL + projectId + "/" + solutionId,
		config
	);

	return response.data;
};

const improveSolution = async (
	{ solutionId, projectId, boxes, container },
	token
) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(
		API_URL + "improve/" + projectId + "/" + solutionId,
		{ boxes, container },
		config
	);

	return response.data;
};

const solutionService = {
	createSolution,
	updateSolution,
	deleteSolution,
	improveSolution,
};

export default solutionService;
