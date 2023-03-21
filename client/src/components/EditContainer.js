import { useState } from "react";
import { useFileData } from "./FileDataProvider";
import { Link } from "react-router-dom";

export const EditContainer = () => {
	const { container, setContainer } = useFileData();
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
	};

	return (
		<div>
			<form>
				<label>Width</label>
				<input
					type="number"
					id="width"
					value={formWidth}
					onChange={(e) => {
						setFormWidth(e.target.value);
					}}
				/>
				<br />
				<label>Height</label>
				<input
					type="number"
					id="height"
					value={formHeight}
					onChange={(e) => {
						setFormHeight(e.target.value);
					}}
				/>
				<br />
				<label>Length</label>
				<input
					type="number"
					id="length"
					value={formLength}
					onChange={(e) => {
						setFormLength(e.target.value);
					}}
				/>
				<br />
				<Link
					to="/edit_boxes"
					onClick={handleEditContainer}
				>
					<button>Continue</button>
				</Link>
			</form>
		</div>
	);
};
