import { useState } from "react";
import { useFileData } from "./FileDataProvider";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "./UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";

export const EditBoxes = () => {
	const { boxes, setBoxes, container } = useFileData();
	const [boxId, setBoxId] = useState(0);
	const { addProject, isLoading, error } = useUserData();
	const navigate = useNavigate();

	const editBoxById = (id) => {
		return (newBox) => {
			const newBoxes = boxes.map((box, index) =>
				index === id ? newBox : box
			);
			setBoxes(newBoxes);
		};
	};

	const handleAddProject = async (e) => {
		await addProject({
			container: container,
			boxes: boxes,
			solutions: [],
		});
		navigate("/projects");
	};

	return (
		<div>
			<BoxesTable
				boxes={boxes}
				setBoxId={setBoxId}
			/>

			<br />

			<BoxForm
				box={boxes[boxId]}
				editBox={editBoxById(boxId)}
			/>

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
		</div>
	);
};
