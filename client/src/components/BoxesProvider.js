import { useState, createContext, useContext, useEffect } from "react";

/*
user: order, type, width, height, length
react: order, type, size, position, color
to_server: order, type, size, position, color
to_algorithm: order, width, height, length
from_algorithm: order, x, y, z, orientation
from_server: order, type, size, position, color
*/

const BoxesContext = createContext("");

export const BoxesProvider = ({ children }) => {
	const [boxes, setBoxes] = useState([]);
	const [solutions, setSolutions] = useState({});
	const [solutionId, setSolutionId] = useState(0);
	const [previousBoxes, setPreviousBoxes] = useState(boxes);
	const [boxIndices, setBoxIndices] = useState([]);

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

	useEffect(() => {
		const showCurrentSolution = function () {
			if (Object.keys(solutions).length != 0) {
				let solution = solutions[solutionId];
				let solution_boxes = solution.boxes;

				solution_boxes = solution_boxes.map((box) => {
					return { ...box, color: stringToColour(box.text) };
				});
				setBoxes(solution_boxes);
			}
		};
		showCurrentSolution();
	}, [solutions, solutionId]);

	const setDataFromUser = async (user_boxes) => {
		//console.log(user_boxes);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(user_boxes),
		};

		let data = await fetch(
			"http://localhost:1337/noam1502",
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
		<BoxesContext.Provider
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
			}}
		>
			{children}
		</BoxesContext.Provider>
	);
};

export const useBoxes = () => useContext(BoxesContext);
