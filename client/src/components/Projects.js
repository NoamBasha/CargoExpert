import { Link } from "react-router-dom";
import { Project } from "./Project.js";

export const Projects = () => {
	return (
		<div>
			<Link to="/project">Go To Project</Link>
			<br></br>
			<Link to="/new_project">Create a New Project</Link>
		</div>
	);
};
