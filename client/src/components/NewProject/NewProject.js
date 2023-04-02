import { FileUpload } from "./FileUpload/FileUpload";
import { EditContainer } from "./Container/EditContainer";
import { ProjectSettings } from "./ProjectSettings/ProjectSettings";
import { EditBoxes } from "./Boxes/EditBoxes";
import { useState } from "react";
import { Wizard } from "./Wizard";
import { useUserData } from "../UserDataProvider";
import { useNavigate } from "react-router-dom";
import { Button, Alert, CircularProgress } from "@mui/material";
import "./NewProject.css";

export const NewProject = () => {
	const [container, setContainer] = useState([]);
	const [boxes, setBoxes] = useState([]);
	const [name, setName] = useState("Project");
	const [stage, setStage] = useState(0);
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

	const validateNumberProperty = (property) => {
		if (isNaN(property)) {
			return false;
		}
		if (parseFloat(property) <= 0) {
			return false;
		}
		return true;
	};

	const validateBox = (box) => {
		if (Object.values(box).includes(null)) {
			return false;
		}
		if (Object.values(box).includes(undefined)) {
			return false;
		}
		if (isNaN(box.order) || box.order <= 0) {
			return false;
		}
		if (
			!validateNumberProperty(box.width) ||
			!validateNumberProperty(box.height) ||
			!validateNumberProperty(box.length)
		) {
			return false;
		}
		return true;
	};

	const validateBoxes = () => {
		for (let i = 0; i < boxes.length; i++) {
			let box = boxes[i];
			if (!validateBox(box)) {
				return false;
			}
		}
		return true;
	};

	const handleAddProject = async (e) => {
		if (validateBoxes()) {
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
		} else {
			alert("Problem with boxes");
		}
	};

	return (
		<div className="stage">
			<Wizard stage={stage} />
			{stage == 0 ? (
				<ProjectSettings
					name={name}
					setName={setName}
					setStage={setStage}
				/>
			) : null}

			{stage == 1 ? (
				<FileUpload
					setStage={setStage}
					setContainer={setContainer}
					setBoxes={setBoxes}
				/>
			) : null}
			{stage == 2 ? (
				<EditContainer
					setStage={setStage}
					container={container}
					setContainer={setContainer}
				/>
			) : null}
			{stage == 3 ? (
				<EditBoxes
					setStage={setStage}
					boxes={boxes}
					setBoxes={setBoxes}
					addProject={addProject}
				/>
			) : null}
			{error && (
				<Alert
					severity="error"
					className="mt-3"
				>
					{error}
				</Alert>
			)}

			<br />

			{stage == 3 ? (
				isLoading ? (
					<CircularProgress />
				) : (
					<Button onClick={handleAddProject}>Create Project!</Button>
				)
			) : null}
		</div>
	);
};
