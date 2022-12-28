import { useState, createContext, useContext } from "react";

const BoxesContext = createContext("");

export const BoxesProvider = ({ children }) => {
	const [boxes, setBoxes] = useState([
		{
			size: [2, 2, 5],
			position: [1, 1, 2.5],
			color: "#00BCFF",
			text: "Box0",
		},
		{
			size: [2, 2, 5],
			position: [3, 1, 2.5],
			color: "#00BCFF",
			text: "Box1",
		},
		{
			size: [2, 2, 5],
			position: [1, 3, 2.5],
			color: "#00BCFF",
			text: "Box2",
		},
		{
			size: [2, 2, 5],
			position: [1, 1, 7.5],
			color: "#00BCFF",
			text: "Box3",
		},
		{
			size: [2, 2, 5],
			position: [1, 3, 7.5],
			color: "#00BCFF",
			text: "Box4",
		},
		{
			size: [2, 2, 5],
			position: [3, 1, 7.5],
			color: "#00BCFF",
			text: "Box5",
		},

		{
			size: [1, 1, 2.5],
			position: [2.5, 2.5, 1.25],
			color: "#00ffbc",
			text: "Box6",
		},
		{
			size: [1, 1, 2.5],
			position: [2.5, 2.5, 3.75],
			color: "#00ffbc",
			text: "Box7",
		},
		{
			size: [1, 1, 2.5],
			position: [2.5, 2.5, 6.25],
			color: "#00ffbc",
			text: "Box8",
		},
		{
			size: [1, 1, 2.5],
			position: [2.5, 2.5, 8.75],
			color: "#00ffbc",
			text: "Box9",
		},
	]);
	const [previousBoxes, setPreviousBoxes] = useState(boxes);
	// Which boxes are currently selected
	const [boxIndices, setBoxIndices] = useState([]);

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
			}}
		>
			{children}
		</BoxesContext.Provider>
	);
};

export const useBoxes = () => useContext(BoxesContext);
