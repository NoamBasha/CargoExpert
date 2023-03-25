import { useState, createContext, useContext, useEffect } from "react";
import { useUserData } from "./UserDataProvider";
/*
user: order, type, width, height, length
react: order, type, size, position, color
to_server: order, type, size, position, color
to_algorithm: order, width, height, length
from_algorithm: order, x, y, z, orientation
from_server: order, type, size, position, color
*/

const ProjectContext = createContext("");

export const ProjectProvider = ({ children }) => {
	const [projectId, setProjectId] = useState(null);
	const [solutions, setSolutions] = useState(null);
	const [solution, setSolution] = useState(null);
	const [solutionId, setSolutionId] = useState(null);
	const [container, setContainer] = useState(null);
	const [boxes, setBoxes] = useState([]);
	const [previousBoxes, setPreviousBoxes] = useState(boxes);
	const [boxIndices, setBoxIndices] = useState([]);

	const { projects } = useUserData();

	useEffect(() => {
		if (projectId !== null) {
			let index = projects.findIndex(
				(project) => project.id === projectId
			);
			setSolutions(projects[index].solutions);
			setContainer(projects[index].container);
			console.log(projects[index].solutions);
		}

		// return function (projectId = null)?
	}, [projectId, projects]);

	/*
	useEffect(() => {
		if (solutions !== null && solutionId !== null) {

			let index = solutions.findIndex(
				(solution) => solution.id === solutionId
			);
			setSolutions(solutions[index]);
			console.log(solutions[index]);
			//setBoxes(solutions[index].boxes);
		}

		// return function (solutionId = null)?
	}, [solutionId]);
	*/

	useEffect(() => {
		if (
			solutions !== null &&
			Object.keys(solutions).length !== 0 &&
			solutionId !== null
		) {
			console.log(solutions);
			let index = solutions.findIndex(
				(solution) => solution.id === solutionId
			);
			setSolutionId(index);
			let solution = solutions[index];
			setSolution(solution);
			let solution_boxes = solution.boxes;

			solution_boxes = solution_boxes.map((box) => {
				return { ...box, color: stringToColour(box.text) };
			});
			setBoxes(solution_boxes);
		}
	}, [solutions, solutionId, projects]);

	const getPreviousSolution = () => {
		let len = Object.keys(solutions).length;
		setSolutionId((((solutionId - 1) % len) + len) % len);
	};

	const getNextSolution = () => {
		setSolutionId((solutionId + 1) % Object.keys(solutions).length);
	};

	const stringToColour = function (str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = "#";
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	};

	const setDataFromUser = async (container_and_boxes) => {
		//console.log(container_and_boxes);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(container_and_boxes),
		};

		let data = await fetch(
			"http://localhost:1337/get_solutions",
			requestOptions
		);

		data = await data.json();
		setSolutions(data);
		setSolutionId(0);
		console.log(data);
		console.log(solutions);
	};

	const changeBoxIndices = (id) => {
		if (boxIndices.includes(id)) {
			setBoxIndices((boxIndices) => {
				return boxIndices.filter((item) => item !== id);
			});
		} else {
			setBoxIndices([...boxIndices, id]);
		}
	};

	const moveBox = ([a, b, c]) => {
		const newBoxes = boxes.map((item, index) => {
			if (boxIndices.includes(index)) {
				const [x, y, z] = item.position;
				return { ...item, position: [x + a, y + b, z + c] };
			} else return item;
		});
		setBoxes(newBoxes);
	};

	const rotateBox = (axis) => {
		const newBoxes = boxes.map((item, index) => {
			if (boxIndices.includes(index)) {
				const [w, h, l] = item.size;
				if (axis === "x") {
					return { ...item, size: [w, l, h] };
				}
				if (axis === "y") {
					return { ...item, size: [l, h, w] };
				}
				if (axis === "z") {
					return { ...item, size: [h, w, l] };
				}
				return item;
			} else return item;
		});
		setBoxes(newBoxes);
	};

	const resetBoxes = () => {
		setBoxes(previousBoxes);
	};

	const changeBoxById = (id, newItem) => {
		const newBoxes = boxes.map((item, index) =>
			index === id ? newItem : item
		);
		setBoxes(newBoxes);
	};

	return (
		<ProjectContext.Provider
			value={{
				boxes,
				boxIndices,
				moveBox,
				changeBoxIndices,
				changeBoxById,
				rotateBox,
				resetBoxes,
				setDataFromUser,
				getNextSolution,
				getPreviousSolution,
				setProjectId,
				solutions,
				setSolutionId,
				container,
				solutionId,
				projectId,
			}}
		>
			{children}
		</ProjectContext.Provider>
	);
};

export const useProject = () => useContext(ProjectContext);
