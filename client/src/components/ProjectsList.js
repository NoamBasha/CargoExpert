import { useUserData } from "./UserDataProvider.js";
import { useProject } from "./ProjectProvider.js";
import { useNavigate } from "react-router-dom";

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
			<ol>
				{projects.map((project, index) => {
					return (
						<li key={index}>
							<button onClick={() => handleClick(project.id)}>
								Project {index + 1}
							</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
