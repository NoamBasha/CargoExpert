import { Button, Snackbar } from "@mui/material";
import { useProject } from "../ProjectProvider";
import { useUserData } from "../../UserDataProvider.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";

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

export const SolutionsTable = () => {
	const { solutions, setSolutionId, projectId } = useProject();
	const { deleteSolution, duplicateSolution, updateSolutionName, isLoading } =
		useUserData();

	const [tableSolutionId, setTableSolutionId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

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
			solution_data: solution.solution_data,
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
		if (solution != null) {
			const newSolution = {
				...solution,
				name: name,
			};
			updateSolutionName(projectId, newSolution);
			setSnackbarMessage(`Changed name to ${name}`);
		}
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table
					aria-label="projects table"
					stickyHeader
				>
					<TableHead>
						<TableRow>
							<TableCell style={{ fontWeight: "bold" }}>
								Solution
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Number Of Items
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Capacity
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Order Score
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Overall Score
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Change Name
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Duplicate
							</TableCell>
							{solutions.length != 1 ? (
								<TableCell style={{ fontWeight: "bold" }}>
									Delete
								</TableCell>
							) : null}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row) => {
							return (
								<TableRow key={row.id}>
									<TableCell>
										<Button
											onClick={() => {
												handleClick(row.id);
											}}
										>
											{row.name}
										</Button>
									</TableCell>
									<TableCell>
										{row.solution_data.number_of_items}
									</TableCell>
									<TableCell>
										{row.solution_data.capacity}
									</TableCell>
									<TableCell>
										{row.solution_data.order_score}
									</TableCell>
									<TableCell>
										{row.solution_data.overall_score}
									</TableCell>

									<TableCell>
										{isLoading ? (
											<CircularProgress />
										) : (
											<IconButton
												onClick={() => {
													setShowChangeNamePopup(
														true
													);
													setTableSolutionId(row.id);
												}}
											>
												<EditOutlinedIcon
													color="primary"
													size="small"
												></EditOutlinedIcon>
											</IconButton>
										)}
									</TableCell>
									<TableCell>
										{isLoading ? (
											<CircularProgress />
										) : (
											<IconButton
												onClick={() => {
													duplicateSolution(
														projectId,
														row.id
													);
													setSnackbarMessage(
														`Duplicated solution`
													);
												}}
											>
												<ContentCopyOutlinedIcon
													color="primary"
													size="small"
												></ContentCopyOutlinedIcon>
											</IconButton>
										)}
									</TableCell>

									{solutions.length != 1 ? (
										<TableCell>
											{isLoading ? (
												<CircularProgress />
											) : (
												<IconButton
													onClick={() => {
														setShowDeletePopup(
															true
														);
														setTableSolutionId(
															row.id
														);
													}}
												>
													<DeleteOutlineIcon
														color="primary"
														size="small"
													></DeleteOutlineIcon>
												</IconButton>
											)}
										</TableCell>
									) : null}
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
					onClose={() => {
						setShowDeletePopup(false);
						setSnackbarMessage("Deleted solution");
					}}
				/>
			) : null}
			<Snackbar
				open={snackbarMessage !== ""}
				message={snackbarMessage}
				onClose={() => setSnackbarMessage("")}
				autoHideDuration={4000}
			/>
		</div>
	);
};
