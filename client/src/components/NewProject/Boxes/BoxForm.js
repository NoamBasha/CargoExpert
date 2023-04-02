import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export const BoxForm = ({ boxes, selectedIds, editBox }) => {
	const [formOrder, setFormOrder] = useState("");
	const [formWidth, setFormWidth] = useState("");
	const [formHeight, setFormHeight] = useState("");
	const [formLength, setFormLength] = useState("");
	const [formType, setFormType] = useState("");

	useEffect(() => {
		if (selectedIds.length == 1) {
			const box = boxes[selectedIds[0] - 1];
			setFormOrder(box.order);
			setFormWidth(box.width);
			setFormHeight(box.height);
			setFormLength(box.length);
			setFormType(box.type);
		}
	}, [selectedIds]);

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
						setFormOrder(parseFloat(e.target.value));
					}}
				/>
				<br />
				<label>Width</label>
				<TextField
					type="number"
					id="width"
					value={formWidth}
					onChange={(e) => {
						setFormWidth(parseFloat(e.target.value));
					}}
				/>
				<br />
				<label>Height</label>
				<TextField
					type="number"
					id="height"
					value={formHeight}
					onChange={(e) => {
						setFormHeight(parseFloat(e.target.value));
					}}
				/>
				<br />
				<label>Length</label>
				<TextField
					type="number"
					id="length"
					value={formLength}
					onChange={(e) => {
						setFormLength(parseFloat(e.target.value));
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
