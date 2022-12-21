import { ThreeScene } from "./ThreeScene.js";
import { useState, createContext } from "react";

const AxisButton = ({ text, moveBy, setBoxPosition }) => {
	return <button onClick={() => setBoxPosition(moveBy)}>{text}</button>;
};

const EditButton = ({ setEdit }) => {
	return <button onClick={() => setEdit()}>Edit</button>;
};

const ViewButton = ({ setEdit, validateBoxesLocation, colorBoxes }) => {
	return (
		<button
			onClick={() => {
				if (validateBoxesLocation()) {
					setEdit();
					//colorBoxes();
				}
			}}
		>
			View
		</button>
	);
};

export const EditContext = createContext(null);

export const View = () => {
	const [edit, setEdit] = useState(false);
	// Which box is currently selected
	const [boxIndices, setBoxIndices] = useState([]);
	const [container, setContainer] = useState([4, 4, 10]);
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
	const axisButtons = [
		{ text: "-x", moveBy: [-1, 0, 0] },
		{ text: "x+", moveBy: [1, 0, 0] },
		{ text: "-y", moveBy: [0, -1, 0] },
		{ text: "y+", moveBy: [0, 1, 0] },
		{ text: "-z", moveBy: [0, 0, -1] },
		{ text: "z+", moveBy: [0, 0, 1] },
	];

	// returns true if there is a box that is out of bounds
	// return false if everything is ok
	const isBoxesOutOfBounds = (boxes, container) => {
		const isOutOfBounds = boxes.some((box) => {
			const x_condiction =
				box.position[0] + 0.5 * box.size[0] > container[0] ||
				box.position[0] - 0.5 * box.size[0] < 0;
			const y_condiction =
				box.position[1] + 0.5 * box.size[1] > container[1] ||
				box.position[1] - 0.5 * box.size[1] < 0;
			const z_condiction =
				box.position[2] + 0.5 * box.size[2] > container[2] ||
				box.position[2] - 0.5 * box.size[2] < 0;
			return x_condiction || y_condiction || z_condiction;
		});
		return isOutOfBounds;
	};

	// return true if two boxes are overlapping
	const isTwoBoxesOverLapping = (box1, box2) => {
		const box1xMin = box1.position[0] - box1.size[0] / 2;
		const box1xMax = box1.position[0] + box1.size[0] / 2;
		const box2xMin = box2.position[0] - box2.size[0] / 2;
		const box2xMax = box2.position[0] + box2.size[0] / 2;

		// Check if boxes are separated along x axis
		if (box1xMax <= box2xMin || box2xMax <= box1xMin) {
			return false;
		}

		const box1yMin = box1.position[1] - box1.size[1] / 2;
		const box1yMax = box1.position[1] + box1.size[1] / 2;
		const box2yMin = box2.position[1] - box2.size[1] / 2;
		const box2yMax = box2.position[1] + box2.size[1] / 2;

		if (box1yMax <= box2yMin || box2yMax <= box1yMin) {
			return false;
		}

		const box1zMin = box1.position[2] - box1.size[2] / 2;
		const box1zMax = box1.position[2] + box1.size[2] / 2;
		const box2zMin = box2.position[2] - box2.size[2] / 2;
		const box2zMax = box2.position[2] + box2.size[2] / 2;

		if (box1zMax <= box2zMin || box2zMax <= box1zMin) {
			return false;
		}

		// If boxes are not separated along any axis, they must be overlapping
		return true;
	};

	// returns true if everything is ok
	const isBoxesOverlapping = (boxes) => {
		for (let i = 0; i < boxes.length; i++) {
			for (let j = i + 1; j < boxes.length; j++) {
				if (isTwoBoxesOverLapping(boxes[i], boxes[j])) {
					console.log(boxes[i], boxes[j]);
					return true;
				}
			}
		}
		return false;
	};

	const validateBoxesLocation = (boxes, container) => {
		return () => {
			if (isBoxesOutOfBounds(boxes, container)) {
				alert("Not all of the boxes are inside the container");
			} else if (isBoxesOverlapping(boxes, container)) {
				alert("There are boxes overlapping");
			} else {
				return true;
			}
			return false;
		};
	};

	const changeLocation = ([a, b, c]) => {
		const newBoxes = boxes.map((item, index) => {
			if (boxIndices.includes(index)) {
				const [x, y, z] = item.position;
				return { ...item, position: [x + a, y + b, z + c] };
			} else return item;
		});
		setBoxes(newBoxes);
	};

	return (
		<EditContext.Provider value={{ edit }}>
			{edit
				? axisButtons.map(({ text, moveBy }, index) => {
						return (
							<AxisButton
								key={index}
								text={text}
								moveBy={moveBy}
								setBoxPosition={changeLocation}
							/>
						);
				  })
				: null}

			<ThreeScene
				container={container}
				boxes={boxes}
				setBoxes={setBoxes}
				setBoxIndices={(id) => {
					if (boxIndices.includes(id)) {
						setBoxIndices((boxIndices) => {
							return boxIndices.filter((item) => item !== id);
						});
					} else {
						setBoxIndices([...boxIndices, id]);
					}
				}}
			/>

			<EditButton setEdit={() => setEdit(true)} />
			<ViewButton
				setEdit={() => setEdit(false)}
				validateBoxesLocation={validateBoxesLocation(boxes, container)}
				//colorBoxes={colorBoxes(boxes)}
			/>
		</EditContext.Provider>
	);
};
