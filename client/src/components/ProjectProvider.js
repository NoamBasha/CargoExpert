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

	// Change id access
	const getPreviousSolution = () => {
		let len = Object.keys(solutions).length;
		setSolutionId((((solutionId - 1) % len) + len) % len);
	};

	// Change id access
	const getNextSolution = () => {
		setSolutionId((solutionId + 1) % Object.keys(solutions).length);
	};

	const changeBoxIndices = (newId) => {
		if (boxIndices.includes(newId)) {
			setBoxIndices((boxIndices) => {
				return boxIndices.filter((id) => id !== newId);
			});
		} else {
			setBoxIndices([...boxIndices, newId]);
		}
	};

	const moveBox = ([a, b, c]) => {
		const newBoxes = boxes.map((box) => {
			console.log(boxIndices);
			if (boxIndices.includes(box.id)) {
				const [x, y, z] = box.position;
				return { ...box, position: [x + a, y + b, z + c] };
			} else return box;
		});
		setBoxes(newBoxes);
	};

	const rotateBox = (axis) => {
		const newBoxes = boxes.map((box) => {
			if (boxIndices.includes(box.id)) {
				const [w, h, l] = box.size;
				if (axis === "x") {
					return { ...box, size: [w, l, h] };
				}
				if (axis === "y") {
					return { ...box, size: [l, h, w] };
				}
				if (axis === "z") {
					return { ...box, size: [h, w, l] };
				}
				return box;
			} else return box;
		});
		setBoxes(newBoxes);
	};

	const resetBoxes = () => {
		setBoxes(previousBoxes);
	};

	const changeBoxById = (id, newBox) => {
		const newBoxes = boxes.map((box) => {
			if (box.id === id) {
				console.log(box, newBox);
				return newBox;
			} else {
				return box;
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
