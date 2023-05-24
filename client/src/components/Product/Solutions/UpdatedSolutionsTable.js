import { DataGrid } from "@mui/x-data-grid";
import { Snackbar, Button } from "@mui/material";
import { useProject } from "../ProjectProvider";
import { useUserData } from "../../UserDataProvider.js";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { ChangeNamePopup } from "../ChangeNamePopup";
import { DeletePopup } from "../DeletePopup";

export const UpdatedSolutionsTable = ({ title }) => {
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

	const columns = [
		{ field: "id", headerName: "ID", width: 100 },
		{
			field: "solutionName",
			headerName: `${title} - Solution`,
			width: 100,
		},
		{ field: "numberOfItems", headerName: "Number Of Items", width: 100 },
		{ field: "capacity", headerName: "Capacity", width: 100 },
		{ field: "orderScore", headerName: "Order Score", width: 100 },
		{ field: "overallScore", headerName: "Overall Score", width: 100 },
		{ field: "changeName", headerName: "Change Name", width: 100 },
		{ field: "duplicate", headerName: "Duplicate", width: 100 },
		solutions.length != 1
			? { field: "delete", headerName: "Delete", width: 100 }
			: null,
	];

	const tableData = solutions.map((solution) => {
		return {
			id: solution.id,
			name: solution.name,
			solution_data: solution.solution_data,
		};
	});

	const rows = tableData.map((solution) => {
		return {
			id: (
				<Button
					onClick={() => {
						handleClick(solution.id);
					}}
				>
					{solution.name}
				</Button>
			),
			solutionName: solution.name,
			numberOfItems: solution.solution_data.number_of_items,
			capacity: solution.solution_data.capacity,
			orderScore: solution.solution_data.order_score,
			overallScore: solution.solution_data.overall_score,
			changeName: isLoading ? (
				<CircularProgress />
			) : (
				<IconButton
					onClick={() => {
						setShowChangeNamePopup(true);
						setTableSolutionId(solution.id);
					}}
				>
					<EditOutlinedIcon
						color="primary"
						size="small"
					></EditOutlinedIcon>
				</IconButton>
			),
			duplicate: isLoading ? (
				<CircularProgress />
			) : (
				<IconButton
					onClick={() => {
						duplicateSolution(projectId, solution.id);
						setSnackbarMessage(`Duplicated solution`);
					}}
				>
					<ContentCopyOutlinedIcon
						color="primary"
						size="small"
					></ContentCopyOutlinedIcon>
				</IconButton>
			),
			delete:
				solutions.length != 1 ? (
					isLoading ? (
						<CircularProgress />
					) : (
						<IconButton
							onClick={() => {
								setShowDeletePopup(true);
								setTableSolutionId(solution.id);
							}}
						>
							<DeleteOutlineIcon
								color="primary"
								size="small"
							></DeleteOutlineIcon>
						</IconButton>
					)
				) : null,
		};
	});

	console.log(rows);

	return (
		<div className="w-100 ">
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: {
							pageSize: 5,
						},
					},
				}}
				pageSizeOptions={[5]}
				checkboxSelection
				disableRowSelectionOnClick
			/>
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
