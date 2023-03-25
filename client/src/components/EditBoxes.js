import { useState } from "react";
import { useFileData } from "./FileDataProvider";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "./UserDataProvider";
import { useNavigate } from "react-router-dom";

export const EditBoxes = () => {
	const { boxes, setBoxes, container } = useFileData();
	const [boxId, setBoxId] = useState(0);
	const { addProject } = useUserData();
	const navigate = useNavigate();

	const editBoxById = (id) => {
		return (newBox) => {
			const newBoxes = boxes.map((box, index) =>
				index === id ? newBox : box
			);
			setBoxes(newBoxes);
		};
	};

	const handleAddProject = (e) => {
		addProject({
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

			<br />

			<button onClick={handleAddProject}>Create Project!</button>
		</div>
	);
};
