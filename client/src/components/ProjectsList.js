import { Link } from "react-router-dom";
import { useState } from "react";
import { useUserData } from "./UserDataProvider.js";

export const ProjectsList = () => {
	const { projects } = useUserData();
	if (projects == null || projects.length == 0) {
		return <h3>There are no projects, please create a new project</h3>;
	}

	return (
		<div>
			<ol>
				{projects.map((project, index) => {
					return (
						<li key={project.id}>
							<Link
								to="/project"
								//onClick={setProjectId(project.id)}
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
