import { useState } from "react";
// import { useFileData } from "../FileDataProvider";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "../../UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";

export const EditBoxes = ({ setStage, boxes, setBoxes, container }) => {
	//const { boxes, setBoxes, container } = useFileData();
	const [boxId, setBoxId] = useState(0);
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

	const editBoxById = (order) => {
		return (newBox) => {
			const newBoxes = boxes.map((box) =>
				box.order === order ? newBox : box
			);
			setBoxes(newBoxes);
		};
	};

	const handleAddProject = async (e) => {
		let project_boxes = boxes.map((box) => {
			return { ...box, color: stringToColour(box.type) };
		});

		//TODO: no container
		await addProject({
			container: container,
			boxes: project_boxes,
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
