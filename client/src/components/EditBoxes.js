import { useState } from "react";
import { useFileData } from "./FileDataProvider";
import { Link } from "react-router-dom";
import { BoxesTable } from "./BoxesTable.js";
import { BoxForm } from "./BoxForm";
import { useUserData } from "./UserDataProvider";

export const EditBoxes = () => {
	const { boxes, setBoxes, container } = useFileData();
	const [boxId, setBoxId] = useState(0);
	const { addProject } = useUserData();

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

			<Link
				to="/projects"
				onClick={handleAddProject}
			>
				<button>Create Project!</button>
			</Link>
		</div>
	);
};
