import { useState } from "react";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { Button } from "@mui/material";
import "./EditBoxes.css";

export const EditBoxes = ({ setStage, boxes, setBoxes }) => {
	const [selectedIds, setSelecetedIds] = useState([]);

	const editSelectedIds = (newBox) => {
		const newBoxes = boxes.map((box) => {
			if (selectedIds.includes(box.id)) {
				return { id: box.id, ...newBox };
			} else {
				return box;
			}
		});
		setBoxes(newBoxes);
	};

	return (
		<>
			<div className="edit-boxes">
				<BoxesTable
					boxes={boxes}
					selectedIds={selectedIds}
					setSelecetedIds={setSelecetedIds}
				/>

				<br />

				<BoxForm
					setBoxes={setBoxes}
					boxes={boxes}
					selectedIds={selectedIds}
					editBox={editSelectedIds}
				/>
			</div>

			<Button onClick={() => setStage((prevStage) => prevStage - 1)}>
				Back
			</Button>
		</>
	);
};
