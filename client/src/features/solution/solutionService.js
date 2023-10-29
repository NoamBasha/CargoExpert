import axios from "axios";

const API_URL = "http://localhost:1337/api/solutions/";

const createSolution = async (projectId, solutionData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	console.log(solutionData);
	const response = await axios.post(
		API_URL + projectId,
		{ solutionData: solutionData },
		config
	);

	return response.data;
};

const solutionService = {
	createSolution,
};

export default solutionService;
