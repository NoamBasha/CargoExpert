import { useState, createContext, useContext } from "react";

const UserDataContext = createContext("");

export const UserDataProvider = ({ children }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const createUser = async ({ email, password, setIsRegistered }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			const response = await fetch(
				"http://localhost:1337/createUser",
				requestOptions
			);
			if (response.status === 200) {
				setIsRegistered(true);
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const readUser = async () => {
		setError("");
		setIsLoading(true);
		setIsLoggedIn(false);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			const response = await fetch(
				"http://localhost:1337/readUser",
				requestOptions
			);
			if (response.status === 200) {
				const data = await response.json();
				setProjects(data);
				console.log(data);
				setIsLoggedIn(true);
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			//TODO: fix error message
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const updateUser = async (new_projects) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
					newProjects: new_projects,
				}),
			};
			const response = await fetch(
				"http://localhost:1337/updateUser",
				requestOptions
			);
			if (response.status === 200) {
				console.log("User updated successfully");
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteUser = async ({ email, password }) => {
		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
				}),
			};
			const response = await fetch(
				"http://localhost:1337/deleteUser",
				requestOptions
			);
			if (response.status === 200) {
				console.log("User deleted successfully");
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const addProject = async (project) => {
		let container_data = {
			width: project.container[0],
			height: project.container[1],
			length: project.container[2],
		};

		const container_and_boxes = {
			boxes: project.boxes,
			container: container_data,
		};

		setError("");
		setIsLoading(true);
		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(container_and_boxes),
			};

			const response = await fetch(
				"http://localhost:1337/getSolutions",
				requestOptions
			);
			if (response.status === 200) {
				const solutions = await response.json();
				let current_id = 0;
				if (projects.length !== 0) {
					//TODO: set id by first unused id?
					current_id = projects[projects.length - 1].id + 1;
				}

				const new_projects = [
					...projects,
					{
						id: current_id,
						name: project.name,
						container: project.container,
						boxes: project.boxes,
						solutions: Object.values(solutions),
					},
				];
				setProjects(new_projects);
				updateUser(new_projects);
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (error) {
			setError(error);
		} finally {
			setIsLoading(false);
		}
	};

	const deleteProject = (id) => {
		let new_projects = projects.filter((project) => {
			return project.id !== id;
		});
		setProjects(new_projects);
		updateUser(new_projects);
	};

	const updateProject = (project) => {
		let new_projects = projects.map((current_project) => {
			return current_project.id === project.id
				? project
				: current_project;
		});
		setProjects(new_projects);
		updateUser(new_projects);
	};

	const duplicateSolution = (projectId, solutionId) => {
		let project;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === projectId) {
				project = projects[i];
				break;
			}
		}

		console.log(project);
		const existingIds = new Set(
			project.solutions.map((solution) => solution.id)
		);
		let missingId = 0;
		while (existingIds.has(missingId)) {
			missingId++;
		}

		let originalSolution;
		for (let i = 0; i < project.solutions.length; i++) {
			if (project.solutions[i].id === solutionId) {
				originalSolution = project.solutions[i];
				break;
			}
		}

		const newSolution = {
			...originalSolution,
			id: missingId,
		};

		addSolution(projectId, newSolution);
	};

	const addSolution = (projectId, solution) => {
		let project;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === projectId) {
				project = projects[i];
				break;
			}
		}
		const newSolutions = [...project.solutions, solution];

		const newProject = {
			...project,
			solutions: newSolutions,
		};

		updateProject(newProject);
	};

	const updateSolutionName = (projectId, newSolution) => {
		let project;
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === projectId) {
				project = projects[i];
				break;
			}
		}
		const newSolutions = project.solutions.filter(
			(solution) => solution.id !== newSolution.id
		);

		const newProject = {
			...project,
			solutions: [...newSolutions, newSolution],
		};

		updateProject(newProject);
	};

	const updateSolution = (project_id, solution_id, boxes) => {
		let new_projects = projects.map((current_project) => {
			if (current_project.id === project_id) {
				let new_project = {
					...current_project,
					solutions: current_project.solutions.map(
						(current_solution) =>
							current_solution.id === solution_id
								? { ...current_solution, boxes: boxes }
								: current_solution
					),
				};
				return new_project;
			} else {
				return current_project;
			}
		});
		console.log(new_projects);
		setProjects(new_projects);
		updateUser(new_projects);
	};

	const deleteSolution = (projectId) => {
		return (solutionId) => {
			let project;
			for (let i = 0; i < projects.length; i++) {
				if (projects[i].id === projectId) {
					project = projects[i];
					break;
				}
			}
			const newSolutions = project.solutions.filter(
				(solution) => solution.id !== solutionId
			);
			const newProject = {
				...project,
				solutions: newSolutions,
			};

			updateProject(newProject);
		};
	};

	return (
		<UserDataContext.Provider
			value={{
				email,
				setEmail,
				password,
				setPassword,
				projects,
				setProjects,
				addProject,
				deleteProject,
				updateSolution,
				readUser,
				isLoading,
				error,
				createUser,
				isLoggedIn,
				setIsLoggedIn,
				updateProject,
				deleteSolution,
				duplicateSolution,
				updateSolutionName,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
};

export const useUserData = () => useContext(UserDataContext);
