import { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";

export const BoxForm = ({ setBoxes, boxes, selectedIds, editBox }) => {
	const [formOrder, setFormOrder] = useState("");
	const [formWidth, setFormWidth] = useState("");
	const [formHeight, setFormHeight] = useState("");
	const [formLength, setFormLength] = useState("");
	const [formType, setFormType] = useState("");

	useEffect(() => {
		if (selectedIds.length === 0) {
			setFormOrder("");
			setFormWidth("");
			setFormHeight("");
			setFormLength("");
			setFormType("");
		}
		if (selectedIds.length === 1) {
			const filteredBoxes = boxes.filter((box) => {
				return box.id === selectedIds[0];
			});
			const box = filteredBoxes[0];
			setFormOrder(box.order);
			setFormWidth(box.width);
			setFormHeight(box.height);
			setFormLength(box.length);
			setFormType(box.type);
		}
	}, [selectedIds, boxes]);

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

	const deleteBoxes = () => {
		const newBoxes = boxes.filter((box) => {
			return !selectedIds.includes(box.id);
		});
		setBoxes(newBoxes);
	};

	const addBox = () => {
		const existingIds = new Set(boxes.map((box) => box.id));
		let missingId = 0;
		while (existingIds.has(missingId)) {
			missingId++;
		}
		const newBox = {
			id: missingId,
			order: formOrder,
			type: formType,
			width: formWidth,
			height: formHeight,
			length: formLength,
			isIn: 0,
		};
		const newBoxes = [...boxes, newBox];
		setBoxes(newBoxes);
	};

	return (
		<form
			className="d-flex flex-column px-3"
			style={{
				border: "1px solid rgba(0,0,0,0.1)",
				borderRadius: "5px",
			}}
		>
			<label className="mt-3">Order:</label>
			<TextField
				className="mb-2"
				type="number"
				id="order"
				value={formOrder}
				onChange={(e) => {
					setFormOrder(parseFloat(e.target.value));
				}}
			/>
			<label>Width:</label>
			<TextField
				className="mb-2"
				type="number"
				id="width"
				value={formWidth}
				onChange={(e) => {
					setFormWidth(parseFloat(e.target.value));
				}}
			/>
			<label>Height:</label>
			<TextField
				className="mb-2"
				type="number"
				id="height"
				value={formHeight}
				onChange={(e) => {
					setFormHeight(parseFloat(e.target.value));
				}}
			/>
			<label>Length:</label>
			<TextField
				className="mb-2"
				type="number"
				id="length"
				value={formLength}
				onChange={(e) => {
					setFormLength(parseFloat(e.target.value));
				}}
			/>
			<label>Type:</label>
			<TextField
				className="mb-2"
				type="text"
				id="type"
				value={formType}
				onChange={(e) => {
					setFormType(e.target.value);
				}}
			/>

			<div className="d-flex justify-content-between">
				<Button onClick={handleEditBox}>Edit</Button>
				<Button onClick={deleteBoxes}>Delete</Button>
				<Button onClick={addBox}>Add</Button>
			</div>
		</form>
	);
};
