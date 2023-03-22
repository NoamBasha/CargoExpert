import { useState, createContext, useContext } from "react";

const UserDataContext = createContext("");

export const UserDataProvider = ({ children }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [projects, setProjects] = useState([]);

	const getUserData = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		let projects = await fetch(
			"http://localhost:1337/getUser",
			requestOptions
		);
		projects = await projects.json();
		console.log(projects);
		setProjects(projects);
	};

	const getSolutionsFromServer = async (container_and_boxes) => {
		//console.log(container_and_boxes);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(container_and_boxes),
		};

		let data = await fetch(
			"http://localhost:1337/noam1502",
			requestOptions
		);

		data = await data.json();
		return data;
	};

	const updateProjectsOnServer = async (new_projects) => {
		// TODO: remove e.preventDefault()
		//e.preventDefault();
		console.log(new_projects);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
				newProjects: new_projects,
			}),
		};
		await fetch("http://localhost:1337/updateProjects", requestOptions);
		console.log(new_projects);
	};

	const addProject = async (project) => {
		let container_data = {
			width: project.container[0],
			height: project.container[1],
			length: project.container[2],
		};

		console.log("1111111111");
		let solutions = await getSolutionsFromServer({
			boxes: project.boxes,
			container: container_data,
		});
		console.log("2222222222");

		//console.log(typeof Object.values(solutions));
		//console.log(Object.values(solutions));

		console.log(project.boxes[0]);

		let current_id = 0;
		if (projects.length !== 0) {
			current_id = projects[projects.length - 1].id + 1;
		}

		let new_projects = [
			...projects,
			{
				id: current_id,
				container: project.container,
				boxes: project.boxes,
				solutions: Object.values(solutions),
			},
		];
		console.log("0000000000000000000000000000000000000000000000000000000");

		console.log(new_projects);

		console.log("0000000000000000000000000000000000000000000000000000000");

		setProjects(new_projects);
		updateProjectsOnServer(new_projects);
	};

	const removeProject = (project) => {
		let new_projects = projects.filter((current_project) => {
			return current_project.id !== project.id;
		});
		setProjects(new_projects);
	};

	const updateProject = (project) => {
		let new_projects = projects.map((current_project) => {
			if (current_project.id === project.id) {
				return project;
			} else {
				return current_project;
			}
		});
		setProjects(new_projects);
		updateProjectsOnServer(new_projects);
	};

	const updateSolution = (project_id, solution_id, boxes) => {
		console.log(project_id, solution_id);
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
		setProjects(new_projects);
		updateProjectsOnServer(new_projects);
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
				removeProject,
				updateProject,
				updateSolution,
				getUserData,
			}}
		>
			{children}
		</UserDataContext.Provider>
	);
};

export const useUserData = () => useContext(UserDataContext);
