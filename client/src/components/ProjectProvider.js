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
	//const [solution, setSolution] = useState(null);
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
			//setSolution(solution);
			setBoxes(solution.boxes);
			setPreviousBoxes(solution.boxes);
			setBoxIndices([]);
		}
	}, [solutions, solutionId, projects]);

	const getPreviousSolution = () => {
		let len = Object.keys(solutions).length;
		setSolutionId((((solutionId - 1) % len) + len) % len);
	};

	const getNextSolution = () => {
		setSolutionId((solutionId + 1) % Object.keys(solutions).length);
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
		const newBoxes = boxes.map((item) => {
			console.log(boxIndices);
			if (boxIndices.includes(item.order)) {
				const [x, y, z] = item.position;
				return { ...item, position: [x + a, y + b, z + c] };
			} else return item;
		});
		setBoxes(newBoxes);
	};

	const rotateBox = (axis) => {
		const newBoxes = boxes.map((item) => {
			if (boxIndices.includes(item.order)) {
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

	const changeBoxById = (order, newItem) => {
		const newBoxes = boxes.map((item) => {
			if (item.order === order) {
				console.log(item, newItem);
				return newItem;
			} else {
				return item;
			}
		});
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
