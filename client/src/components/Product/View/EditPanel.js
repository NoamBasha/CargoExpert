import { Button } from "@mui/material";
import { useProject } from "../ProjectProvider.js";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ThreeSixtyOutlinedIcon from "@mui/icons-material/ThreeSixtyOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Slider } from "@mui/material";

const BoxesButton = ({ text, onClick }) => {
	return <Button onClick={() => onClick()}>{text}</Button>;
};

const MovementIconButton = ({ icon, arg, onClick, bgColor }) => {
	return (
		<IconButton
			style={{
				backgroundColor: bgColor,
				color: "white",
			}}
			onClick={() => onClick(arg)}
		>
			{icon}
		</IconButton>
	);
};

export const EditPanel = ({ maxStepSize }) => {
	const { moveBox, rotateBox, resetBoxes, deselectBoxes, removeBoxes } =
		useProject();
	const [stepSize, setStepSize] = useState(0);

	const buttonsArgs = [
		[[-stepSize, 0, 0], "x", [stepSize, 0, 0], "rgb(255, 90, 90)"],
		[[0, -stepSize, 0], "y", [0, stepSize, 0], "rgb(90, 255, 90)"],
		[[0, 0, -stepSize], "z", [0, 0, stepSize], "rgb(90, 90, 255)"],
	];

	return (
		<div className="mt-5 auto-mx w-75 d-flex flex-column justify-content-center align-items-center">
			<ButtonGroup orientation="vertical">
				{buttonsArgs.map((args) => {
					return (
						<ButtonGroup variant="outlined">
							<MovementIconButton
								icon={<ArrowBackOutlinedIcon size="small" />}
								arg={args[0]}
								onClick={moveBox}
								bgColor={args[3]}
							/>
							<MovementIconButton
								icon={<ThreeSixtyOutlinedIcon size="small" />}
								arg={args[1]}
								onClick={rotateBox}
								bgColor={args[3]}
							/>
							<MovementIconButton
								icon={<ArrowForwardOutlinedIcon size="small" />}
								arg={args[2]}
								onClick={moveBox}
								bgColor={args[3]}
							/>
						</ButtonGroup>
					);
				})}
			</ButtonGroup>
			Step Size: {stepSize}
			<Slider
				defaultValue={0}
				//valueLabelDisplay="auto"
				step={0.5}
				marks
				min={0}
				max={maxStepSize}
				onChange={(event) => setStepSize(event.target.value)}
			/>
			<BoxesButton
				text="Remove"
				onClick={removeBoxes}
			/>
			<BoxesButton
				text="Reset"
				onClick={resetBoxes}
			/>
			<BoxesButton
				text="Deselect"
				onClick={deselectBoxes}
			/>
		</div>
	);
};
