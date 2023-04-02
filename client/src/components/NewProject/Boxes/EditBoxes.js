import { useState } from "react";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "../../UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, Alert, CircularProgress } from "@mui/material";
import "./EditBoxes.css";

export const EditBoxes = ({ setStage, boxes, setBoxes, container, name }) => {
	const [selectedIds, setSelecetedIds] = useState([]);
	const { addProject, isLoading, error } = useUserData();
	const navigate = useNavigate();

	const stringToColour = function (str) {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let colour = "#";
		for (let i = 0; i < 3; i++) {
			let value = (hash >> (i * 8)) & 0xff;
			colour += ("00" + value.toString(16)).substr(-2);
		}
		return colour;
	};

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

	const handleAddProject = async (e) => {
		let project_boxes = boxes.map((box) => {
			return { ...box, color: stringToColour(box.type) };
		});

		console.log(project_boxes);
		await addProject({
			name: name,
			container: container,
			boxes: project_boxes,
			solutions: [],
		});
		navigate("/projects");
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

			{error && (
				<Alert
					severity="error"
					className="mt-3"
				>
					{error}
				</Alert>
			)}

			<br />

			{isLoading ? (
				<CircularProgress />
			) : (
				<Button onClick={handleAddProject}>Create Project!</Button>
			)}
			<Button onClick={() => setStage((prevStage) => prevStage - 1)}>
				Back
			</Button>
		</>
	);
};
