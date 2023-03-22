import { Link } from "react-router-dom";
import { useUserData } from "./UserDataProvider.js";
import { useProject } from "./ProjectProvider.js";

export const ProjectsList = () => {
	const { projects } = useUserData();
	const { setProjectId } = useProject();
	if (projects == null || projects.length == 0) {
		return <h3>There are no projects, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setProjectId(index);
	};

	return (
		<div>
			<ol>
				{projects.map((project, index) => {
					return (
						<li key={index}>
							<Link
								to="/solutions"
								onClick={() => handleClick(project.id)}
							>
								Project {index + 1}
							</Link>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
