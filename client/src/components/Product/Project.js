import { ProjectsTable } from "./Projects/ProjectsTable";
import { SolutionsTable } from "./Solutions/SolutionsTable";
import { SolutionView } from "./View/SolutionView";
import { useProject } from "./ProjectProvider";

export const Project = () => {
	const { projectId, solutionId } = useProject();

	return (
		<div>
			{projectId == null && solutionId == null ? <ProjectsTable /> : null}
			{projectId != null && solutionId == null ? (
				<SolutionsTable />
			) : null}
			{projectId != null && solutionId != null ? <SolutionView /> : null}
		</div>
	);
};
