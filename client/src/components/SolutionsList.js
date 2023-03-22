import { Link } from "react-router-dom";
import { useState } from "react";
import { useProject } from "./ProjectProvider.js";

export const SolutionsList = () => {
	const { solutions, setSolutionId } = useProject();
	if (solutions == null || solutions.length == 0) {
		return <h3>There are no solutions, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setSolutionId(index);
	};

	return (
		<div>
			<ol>
				{solutions.map((solution, index) => {
					return (
						<li key={index}>
							<Link
								to="/view"
								onClick={() => handleClick(solution.id)}
							>
								Solution {index + 1}
							</Link>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
