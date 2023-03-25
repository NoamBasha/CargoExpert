import { ProjectsList } from "./ProjectsList.js";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
	const navigate = useNavigate();

	return (
		<div>
			<ProjectsList />
			<br></br>
			<button onClick={() => navigate("/new_project")}>
				Create a New Project
			</button>
		</div>
	);
};
