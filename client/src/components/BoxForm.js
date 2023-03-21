import { useState } from "react";

export const BoxForm = ({ box, editBox }) => {
	const { width, height, length } = box;
	const [formWidth, setFormWidth] = useState(width);
	const [formHeight, setFormHeight] = useState(height);
	const [formLength, setFormLength] = useState(length);

	const handleEditBox = (e) => {
		e.preventDefault();
		editBox({
			...box,
			width: formWidth,
			height: formHeight,
			length: formLength,
		});
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

				<button onClick={handleEditBox}>Edit Box!</button>
			</form>
		</div>
	);
};
