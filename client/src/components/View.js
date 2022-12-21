import { ThreeScene } from "./ThreeScene.js";
import { useState, createContext } from "react";

const AxisButton = ({ text, moveBy, setBoxPosition }) => {
	return <button onClick={() => setBoxPosition(moveBy)}>{text}</button>;
};

const EditButton = ({ setEdit }) => {
	return <button onClick={() => setEdit()}>Edit</button>;
};

const ViewButton = ({ setEdit }) => {
	return <button onClick={() => setEdit()}>View</button>;
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
			<ViewButton setEdit={() => setEdit(false)} />
		</EditContext.Provider>
	);
};
