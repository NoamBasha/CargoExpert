import { Button } from "@mui/material";
import { useProject } from "../ProjectProvider.js";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ThreeSixtyOutlinedIcon from "@mui/icons-material/ThreeSixtyOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";

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

export const EditPanel = () => {
	const { moveBox, rotateBox, resetBoxes, deselectBoxes } = useProject();

	const buttonsArgs = [
		[[-1, 0, 0], "x", [1, 0, 0], "rgb(255, 90, 90)"],
		[[0, -1, 0], "y", [0, 1, 0], "rgb(90, 255, 90)"],
		[[0, 0, -1], "z", [0, 0, 1], "rgb(90, 90, 255)"],
	];

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
		<div className="mt-5 auto-mx w-25 d-flex flex-column justify-content-center align-items-center">
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

			{/* 
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
			*/}

			<div>
				<BoxesButton
					text="Reset"
					onClick={resetBoxes}
				/>

				<BoxesButton
					text="Deselect"
					onClick={deselectBoxes}
				/>
			</div>
		</div>
	);
};
