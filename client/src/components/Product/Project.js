import { Projects } from "./Projects/Projects";
import { Solutions } from "./Solutions/Solutions";
import { SolutionView } from "./View/SolutionView";
import { useSelector } from "react-redux";
import { selectProjectId } from "../../features/project/projectSlice.js";
import { selectSolutionId } from "../../features/solution/solutionSlice.js";

export const Project = () => {
	console.log("1");

	const projectId = useSelector(selectProjectId);
	console.log("2");

	const solutionId = useSelector(selectSolutionId);

	console.log("3");

	return (
		<div>
			{projectId === null && solutionId === null ? <Projects /> : null}
			{projectId !== null && solutionId === null ? <Solutions /> : null}
			{projectId !== null && solutionId !== null ? (
				<SolutionView />
			) : null}
		</div>
	);
};
