import { FileUpload } from "./FileUpload/FileUpload";
import { EditContainer } from "./Container/EditContainer";
import { ProjectSettings } from "./ProjectSettings/ProjectSettings";
import { EditBoxes } from "./Boxes/EditBoxes";
import { useState } from "react";
import { Wizard } from "./Wizard";
import { useUserData } from "../UserDataProvider";
import { useNavigate } from "react-router-dom";
import "./NewProject.css";

export const NewProject = () => {
	const [container, setContainer] = useState([0, 0, 0]);
	const [boxes, setBoxes] = useState([]);
	const [name, setName] = useState("");
	const [stage, setStage] = useState(0);
	const [orderQuantity, setOrderQuantity] = useState("Quantity");
	const [timeQuality, setTimeQuality] = useState("Time");
	const { addProject, isLoading, setError, setCustomizedError } =
		useUserData();

	const navigate = useNavigate();

	const setNewStage = (dir) => {
		setError("");
		setStage((prevStage) => prevStage + dir * 1);
	};

	const stringToColour = (str) => {
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

	const handleAddProject = async () => {
		setError("");
		if (!validateBoxes()) {
			setCustomizedError("Problem with boxes");
		} else {
			let project_boxes = boxes.map((box) => {
				return { ...box, color: stringToColour(box.type), isIn: 0 };
			});

			const project_data = {
				name: name,
				isQuantity: orderQuantity == "Quantity" ? 1 : 0,
				isQuality: timeQuality == "Quality" ? 1 : 0,
			};

			try {
				await addProject({
					project_data: project_data,
					container: container,
					boxes: project_boxes,
					solutions: [],
				});
				navigate("/home");
			} catch (err) {
				setCustomizedError(err);
			}
		}
	};

	return (
		<>
			<Wizard stage={stage} />
			<h1
				style={{ textAlign: "center" }}
				className="m-0 pt-5 mb-4 display-4"
			>
				{stage == 0 ? "Project Settings" : null}
				{stage == 1 ? "File Upload (Optional)" : null}
				{stage == 2 ? "Edit Container" : null}
				{stage == 3 ? "Edit Boxes" : null}
			</h1>
			<div className="w-100 d-flex flex-column justify-content-center mx-auto align-items-center">
				{stage == 0 ? (
					<ProjectSettings
						name={name}
						setName={setName}
						setNewStage={setNewStage}
						orderQuantity={orderQuantity}
						setOrderQuantity={setOrderQuantity}
						timeQuality={timeQuality}
						setTimeQuality={setTimeQuality}
						setCustomizedError={setCustomizedError}
					/>
				) : null}

				{stage == 1 ? (
					<FileUpload
						setNewStage={setNewStage}
						setContainer={setContainer}
						setBoxes={setBoxes}
						setCustomizedError={setCustomizedError}
					/>
				) : null}

				{stage == 2 ? (
					<EditContainer
						setNewStage={setNewStage}
						container={container}
						setContainer={setContainer}
						setCustomizedError={setCustomizedError}
					/>
				) : null}

				{stage == 3 ? (
					<EditBoxes
						setNewStage={setNewStage}
						boxes={boxes}
						setBoxes={setBoxes}
						handleAddProject={handleAddProject}
						isLoading={isLoading}
					/>
				) : null}
			</div>
		</>
	);
};
