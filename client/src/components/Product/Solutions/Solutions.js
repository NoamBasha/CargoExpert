import { SolutionsTable } from "./SolutionsTable";
import { useSelector } from "react-redux";
import { selectProjectName } from "../../../features/project/projectSlice.js";

export const Solutions = () => {
	const projectName = useSelector(selectProjectName);

	return (
		<div>
			<SolutionsTable title={projectName} />
		</div>
	);
};
