import { useState } from "react";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { Button } from "@mui/material";
import { Alert, CircularProgress } from "@mui/material";
import "./EditBoxes.css";

export const EditBoxes = ({
	setStage,
	boxes,
	setBoxes,
	handleAddProject,
	isLoading,
}) => {
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
		<div className="d-flex flex-column w-100 justify-content-center align-items-center">
			<div
				className=" d-flex justify-content-between "
				style={{ width: "53%" }}
			>
				<BoxesTable
					boxes={boxes}
					selectedIds={selectedIds}
					setSelecetedIds={setSelecetedIds}
				/>
				<BoxForm
					setBoxes={setBoxes}
					boxes={boxes}
					selectedIds={selectedIds}
					editBox={editSelectedIds}
				/>
			</div>

			<div className="w-25 mt-3 d-flex justify-content-between">
				<Button onClick={() => setStage((prevStage) => prevStage - 1)}>
					Back
				</Button>
				{isLoading ? (
					<CircularProgress />
				) : (
					<Button onClick={handleAddProject}>Create Project!</Button>
				)}
			</div>
		</div>
	);
};
