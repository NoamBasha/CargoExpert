import { Link } from "react-router-dom";
import { ProjectsList } from "./ProjectsList.js";

export const Projects = () => {
	return (
		<div>
			<ProjectsList />
			<br></br>
			<Link to="/new_project">Create a New Project</Link>
		</div>
	);
};
