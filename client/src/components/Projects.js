import { Link } from "react-router-dom";
import { Project } from "./Project.js";

export const Projects = () => {
	return (
		<div>
			<Link to="/project">Go To Project</Link>
			<Link to="/new_project">Create a New Project</Link>
		</div>
	);
};
