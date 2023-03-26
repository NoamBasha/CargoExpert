import { ProjectsList } from "./ProjectsList.js";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Projects = () => {
	const navigate = useNavigate();

	return (
		<div>
			<ProjectsList />
			<br></br>
			<Button onClick={() => navigate("/new_project")}>
				Create a New Project
			</Button>
		</div>
	);
};
