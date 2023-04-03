import { List, ListItem, Button } from "@mui/material";
import { useProject } from "../ProjectProvider";
import { useUserData } from "../../UserDataProvider.js";

import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";
import { useState } from "react";
import { ChangeNamePopup } from "../ChangeNamePopup";
import { DeletePopup } from "../DeletePopup";
import { Project } from "../Project";

export const SolutionsTable = () => {
	const { solutions, setSolutionId, projectId } = useProject();
	const { deleteSolution, duplicateSolution, updateSolutionName } =
		useUserData();

	const [tableSolutionId, setTableSolutionId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	if (solutions == null || solutions.length === 0) {
		return <h3>There are no solutions, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setSolutionId(index);
	};

	const tableData = solutions.map((solution) => {
		return {
			id: solution.id,
			name: solution.name,
		};
	});

	const getSolutionById = (id) => {
		for (let i = 0; i < solutions.length; i++) {
			if (solutions[i].id === id) {
				return solutions[i];
			}
		}
		return null;
	};

	const handleChangeName = (id, name) => {
		const solution = getSolutionById(id);
		console.log(solution);
		if (solution != null) {
			const newSolution = {
				...solution,
				name: name,
			};
			updateSolutionName(projectId, newSolution);
		}
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table aria-label="projects table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Enter</TableCell>
							<TableCell>Delete</TableCell>
							<TableCell>Change Name</TableCell>
							<TableCell>Duplicate</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row) => {
							return (
								<TableRow key={row.id}>
									<TableCell>{row.name}</TableCell>
									<TableCell>
										<Button
											onClick={() => handleClick(row.id)}
										>
											Go To Solution
										</Button>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												setShowDeletePopup(true);
												setTableSolutionId(row.id);
											}}
										>
											Delete Solution
										</Button>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												setShowChangeNamePopup(true);
												setTableSolutionId(row.id);
											}}
										>
											Change Name
										</Button>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												duplicateSolution(
													projectId,
													row.id
												);
											}}
										>
											Duplicate
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{showChangeNamePopup ? (
				<ChangeNamePopup
					text="Change Solution Name"
					id={tableSolutionId}
					onSubmit={handleChangeName}
					onClose={() => setShowChangeNamePopup(false)}
				/>
			) : null}
			{showDeletePopup ? (
				<DeletePopup
					text="Delete Solution?"
					id={tableSolutionId}
					onSubmit={deleteSolution(projectId)}
					onClose={() => setShowDeletePopup(false)}
				/>
			) : null}
		</div>
	);
};
