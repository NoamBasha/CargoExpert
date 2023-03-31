import { useState } from "react";
// import { useFileData } from "../FileDataProvider";
import { Button, TextField } from "@mui/material";

export const EditContainer = ({ setStage, container, setContainer }) => {
	//const { container, setContainer } = useFileData();
	const { width, height, length } = container;

	const [formWidth, setFormWidth] = useState(width);
	const [formHeight, setFormHeight] = useState(height);
	const [formLength, setFormLength] = useState(length);

	const handleEditContainer = (event) => {
		setContainer([
			parseInt(formWidth),
			parseInt(formHeight),
			parseInt(formLength),
		]);
		setStage(2);
	};

	return (
		<div>
			<form>
				<label>Width</label>
				<TextField
					type="number"
					id="width"
					value={formWidth}
					onChange={(e) => {
						setFormWidth(e.target.value);
					}}
				/>
				<br />
				<label>Height</label>
				<TextField
					type="number"
					id="height"
					value={formHeight}
					onChange={(e) => {
						setFormHeight(e.target.value);
					}}
				/>
				<br />
				<label>Length</label>
				<TextField
					type="number"
					id="length"
					value={formLength}
					onChange={(e) => {
						setFormLength(e.target.value);
					}}
				/>
				<br />

				<Button onClick={handleEditContainer}>Continue</Button>
			</form>
		</div>
	);
};
