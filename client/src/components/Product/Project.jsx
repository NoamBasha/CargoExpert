import { Projects } from "./Projects/Projects.jsx";
import { Solutions } from "./Solutions/Solutions.jsx";
import { SolutionView } from "./View/SolutionView.jsx";
import { useSelector } from "react-redux";
import { selectProjectId } from "../../features/project/projectSlice.js";
import { selectSolutionId } from "../../features/solution/solutionSlice.js";

export const Project = () => {
    const projectId = useSelector(selectProjectId);
    const solutionId = useSelector(selectSolutionId);

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
