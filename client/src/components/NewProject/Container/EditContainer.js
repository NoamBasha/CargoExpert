import { useState } from "react";
// import { useFileData } from "../FileDataProvider";
import { Button, TextField } from "@mui/material";
import { StandardContainers } from "./StandardContainers";

export const EditContainer = ({ setStage, container, setContainer }) => {
	//const { container, setContainer } = useFileData();
	const { width, height, length } = container;

	const [formWidth, setFormWidth] = useState(width);
	const [formHeight, setFormHeight] = useState(height);
	const [formLength, setFormLength] = useState(length);

	const validateContainer = () => {
		if (isNaN(formWidth) || isNaN(formHeight) || isNaN(formLength)) {
			return false;
		}
		if (formWidth <= 0 || formHeight <= 0 || formLength <= 0) {
			return false;
		}
		return true;
	};

	const handleEditContainer = (event) => {
		if (validateContainer()) {
			setContainer([
				parseInt(formWidth),
				parseInt(formHeight),
				parseInt(formLength),
			]);
			setStage((prevStage) => prevStage + 1);
		} else {
			alert("Problem with container");
		}
	};

	const setStandardContainer = (w, h, l) => {
		setFormWidth(w);
		setFormHeight(h);
		setFormLength(l);
	};

	return (
		<div>
			<StandardContainers setStandardContainer={setStandardContainer} />

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
				<Button onClick={() => setStage((prevStage) => prevStage - 1)}>
					Back
				</Button>
			</form>
		</div>
	);
};
