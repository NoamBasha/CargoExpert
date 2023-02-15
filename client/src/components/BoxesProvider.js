import { useState, createContext, useContext, useEffect } from "react";
import { DataArrayTexture } from "three";

const BoxesContext = createContext("");

export const BoxesProvider = ({ children }) => {
	const [boxes, setBoxes] = useState([]);
	/*

	[
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
	]
	 */
	const [previousBoxes, setPreviousBoxes] = useState(boxes);
	// Which boxes are currently selected
	const [boxIndices, setBoxIndices] = useState([]);

	// user: order, type, width, height, length
	// react: order, type, size, position, color
	// to_server: order, type, size, position, color
	// to_algorithm: order, width, height, length
	// from_algorithm: order, x, y, z, orientation
	// from_server: order, type, size, position, color

	/*
	useEffect(() => {
		async function fetchData() {
			let data = await fetch("http://localhost:1337/noam1302");
			data = await data.json();
			let first_solution = data["1"];
			// change fields names :)
			setBoxes(first_solution.boxes);
		}
		fetchData();
	}, []);
	*/

	useEffect(() => {
		async function fetchData() {
			const react_boxes_container_test = {
				container: { width: 3, height: 1, length: 1 },
				boxes: [
					{
						order: 1,
						type: "Box1",
						width: 1,
						height: 1,
						length: 1,
						color: "gray",
						size: [1, 1, 1],
						position: [1, 1, 1],
					},

					{
						order: 2,
						type: "Box2",
						width: 1,
						height: 1,
						length: 1,
						color: "gray",
						size: [1, 1, 1],
						position: [1, 2, 1],
					},

					{
						order: 3,
						type: "Box3",
						width: 1,
						height: 1,
						length: 1,
						color: "gray",
						size: [1, 1, 1],
						position: [2, 1, 1],
					},
				],
			};

			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(react_boxes_container_test),
			};

			let data = await fetch(
				"http://localhost:1337/noam1502",
				requestOptions
			);

			data = await data.json();
			let first_solution = data["1"];
			setBoxes(first_solution.boxes);
		}
		fetchData();
	}, []);

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
