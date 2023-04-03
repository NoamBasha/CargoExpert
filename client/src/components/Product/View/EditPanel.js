import { Button } from "@mui/material";
import { useProject } from "../ProjectProvider.js";

const AxisButton = ({ text, moveBy, moveBox }) => {
	return <Button onClick={() => moveBox(moveBy)}>{text}</Button>;
};

const RotationButton = ({ text, axis, rotateBox }) => {
	return <Button onClick={() => rotateBox(axis)}>{text}</Button>;
};

const ResetButton = ({ text, resetBoxes }) => {
	return <Button onClick={() => resetBoxes()}>{text}</Button>;
};

export const EditPanel = () => {
	const { moveBox, rotateBox, resetBoxes } = useProject();

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
					<AxisButton
						key={index}
						text={text}
						moveBy={moveBy}
						moveBox={moveBox}
					/>
				);
			})}

			{rotationButtons.map(({ text, axis }, index) => {
				return (
					<RotationButton
						key={index}
						text={text}
						axis={axis}
						rotateBox={rotateBox}
					/>
				);
			})}

			<ResetButton
				key={0}
				text="reset"
				resetBoxes={resetBoxes}
			/>
		</div>
	);
};
