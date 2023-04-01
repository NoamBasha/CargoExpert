import { useProject } from "../ProjectProvider.js";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Button } from "@mui/material";

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
			<List>
				{solutions.map((solution, index) => {
					return (
						<ListItem key={index}>
							<Button onClick={() => handleClick(solution.id)}>
								Solution {index + 1}
							</Button>
						</ListItem>
					);
				})}
			</List>
		</div>
	);
};
