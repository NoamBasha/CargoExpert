import { useUserData } from "../UserDataProvider.js";
import { useProject } from "../ProjectProvider.js";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Button } from "@mui/material";

export const ProjectsList = () => {
	const { projects } = useUserData();
	const { setProjectId } = useProject();
	const navigate = useNavigate();

	if (projects == null || projects.length === 0) {
		return <h3>There are no projects, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setProjectId(index);
		navigate("/solutions");
	};

	return (
		<div>
			<List>
				{projects.map((project, index) => {
					return (
						<ListItem key={index}>
							<Button onClick={() => handleClick(project.id)}>
								{project.name}
							</Button>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};
