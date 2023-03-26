import { useState } from "react";
import { Button, TextField } from "@mui/material";

export const BoxForm = ({ box, editBox }) => {
	const { order, width, height, length, type } = box;
	const [formOrder, setFormOrder] = useState(order);
	const [formWidth, setFormWidth] = useState(width);
	const [formHeight, setFormHeight] = useState(height);
	const [formLength, setFormLength] = useState(length);
	const [formType, setFormType] = useState(type);

	const handleEditBox = (e) => {
		e.preventDefault();
		editBox({
			order: formOrder,
			width: formWidth,
			height: formHeight,
			length: formLength,
			type: formType,
		});
	};

	return (
		<div>
			<form>
				<label>Order</label>
				<TextField
					type="number"
					id="order"
					value={formOrder}
					onChange={(e) => {
						setFormOrder(e.target.value);
					}}
				/>
				<br />
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
				<label>Type</label>
				<TextField
					type="text"
					id="type"
					value={formType}
					onChange={(e) => {
						setFormType(e.target.value);
					}}
				/>
				<br />

				<Button onClick={handleEditBox}>Edit Box!</Button>
			</form>
		</div>
	);
};
