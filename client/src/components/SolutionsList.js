import { useProject } from "./ProjectProvider.js";
import { useNavigate } from "react-router-dom";

export const SolutionsList = () => {
	const { solutions, setSolutionId } = useProject();
	const navigate = useNavigate();

	if (solutions == null || solutions.length === 0) {
		return <h3>There are no solutions, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setSolutionId(index);
		navigate("/view");
	};

	return (
		<div>
			<ol>
				{solutions.map((solution, index) => {
					return (
						<li key={index}>
							<button onClick={() => handleClick(solution.id)}>
								Solution {index + 1}
							</button>
						</li>
					);
				})}
			</ol>
		</div>
	);
};
