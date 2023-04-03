import { Button } from "@mui/material";
import { useProject } from "../ProjectProvider.js";

const MovementButton = ({ text, arg, onClick }) => {
	return <Button onClick={() => onClick(arg)}>{text}</Button>;
};

const BoxesButton = ({ text, onClick }) => {
	return <Button onClick={() => onClick()}>{text}</Button>;
};

export const EditPanel = () => {
	const { moveBox, rotateBox, resetBoxes, deselectBoxes } = useProject();

	const axisButtons = [
		{ text: "-x", moveBy: [-1, 0, 0] },
		{ text: "x+", moveBy: [1, 0, 0] },
		{ text: "-y", moveBy: [0, -1, 0] },
		{ text: "y+", moveBy: [0, 1, 0] },
		{ text: "-z", moveBy: [0, 0, -1] },
		{ text: "z+", moveBy: [0, 0, 1] },
	];

	const rotationButtons = [
		{ text: "rotate x", axis: "x" },
		{ text: "rotate y", axis: "y" },
		{ text: "rotate z", axis: "z" },
	];

	return (
		<div>
			{axisButtons.map(({ text, moveBy }, index) => {
				return (
					<MovementButton
						key={index}
						text={text}
						arg={moveBy}
						onClick={moveBox}
					/>
				);
			})}

			{rotationButtons.map(({ text, axis }, index) => {
				return (
					<MovementButton
						key={index}
						text={text}
						arg={axis}
						onClick={rotateBox}
					/>
				);
			})}

			<BoxesButton
				text="reset"
				onClick={resetBoxes}
			/>

			<BoxesButton
				text="deselect all boxes"
				onClick={deselectBoxes}
			/>
		</div>
	);
};
