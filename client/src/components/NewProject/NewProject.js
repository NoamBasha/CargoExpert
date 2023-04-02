import { FileUpload } from "./FileUpload/FileUpload";
import { EditContainer } from "./Container/EditContainer";
import { ProjectSettings } from "./ProjectSettings/ProjectSettings";
import { EditBoxes } from "./Boxes/EditBoxes";
import { useState } from "react";
import { Wizard } from "./Wizard";
import "./NewProject.css";

export const NewProject = () => {
	const [container, setContainer] = useState([]);
	const [boxes, setBoxes] = useState([]);
	const [name, setName] = useState("Project");
	const [stage, setStage] = useState(0);

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
					container={container}
					name={name}
				/>
			) : null}
		</div>
	);
};
