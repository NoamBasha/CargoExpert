import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

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
import { TableSortLabel } from "@mui/material";

import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
	selectProjectSolutions,
	selectProjectBoxes,
} from "../../../features/project/projectSlice.js";

import { selectIsLoading } from "../../../features/projects/projectsSlice.js";

import {
	deleteSolution,
	updateSolution,
	duplicateSolution,
	setSolutionById,
} from "../../../features/solution/solutionSlice.js";

const SortIcon = ({ column, sortByColumn }) => {
	const [isAscending, setIsAscending] = useState("asc");

	return (
		<TableSortLabel
			onClick={() => {
				sortByColumn(column, isAscending, setIsAscending);
			}}
			fontSize="small"
			active={true}
			direction={isAscending ? "asc" : "desc"}
		/>
	);
};

export const SolutionsTable = ({ title }) => {
	const dispatch = useDispatch();

	const solutions = useSelector(selectProjectSolutions);
	const projectBoxes = useSelector(selectProjectBoxes);
	const isLoading = useSelector(selectIsLoading);

	const [tableSolutionId, setTableSolutionId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [tableData, setTableData] = useState([]);
	// const [isAscending, setIsAscending] = useState(true);

	useEffect(() => {
		if (solutions !== null && solutions.length !== 0) {
			setTableData(
				solutions.map((solution) => {
					return {
						_id: solution._id,
						name: solution.name,
						numberOfItems: solution.data.numberOfItems,
						capacity: solution.data.capacity,
						orderScore: solution.data.orderScore,
						overallScore: solution.data.overallScore,
						solutionData: solution.data,
					};
				})
			);
		}
	}, [solutions]);

	if (solutions === null || solutions.length === 0) {
		return <h3>There are no solutions, please create a new project</h3>;
	}

	const handleClick = async (solutionId) => {
		try {
			await dispatch(
				setSolutionById({ solutionId, solutions, projectBoxes })
			).unwrap();
		} catch (error) {
			toast.error(error);
		}
	};

	const handleChangeName = async (solutionId, name) => {
		const solution = solutions.find(
			(solution) => solution._id === solutionId
		);

		if (!solution) return;

		const newSolution = {
			...solution,
			name: name,
		};

		try {
			await dispatch(
				updateSolution({ solutionId, newSolution })
			).unwrap();
			toast.success(`Changed name to ${name}`);
		} catch (error) {
			toast.error(error);
		}
	};

	const handleDelete = async (solutionId) => {
		try {
			await dispatch(deleteSolution({ solutionId })).unwrap();
			toast.success(`Deleted solution successfully`);
		} catch (error) {
			toast.error(error);
		}
	};

	const handleDuplicateSolution = async (solutionId) => {
		try {
			await dispatch(duplicateSolution({solutionId})).unwrap();
			toast.success(`Duplicated solution successfully`);
		} catch (error) {
			toast.error(error);
		}
	};

	const sortByColumn = (column, isAscending, setIsAscending) => {
		setIsAscending((prevIsAscending) => !prevIsAscending);
		const sorted = [...tableData].sort((a, b) => {
			const valueA = a[column];
			const valueB = b[column];

			if (typeof valueA === "string" && typeof valueB === "string") {
				return isAscending
					? valueA.localeCompare(valueB)
					: valueB.localeCompare(valueA);
			}

			return isAscending ? valueA - valueB : valueB - valueA;
		});
		setTableData(sorted);
	};

	return (
		<div className="w-100 ">
			<TableContainer component={Paper}>
				<Table
					aria-label="projects table"
					stickyHeader
				>
					<TableHead>
						<TableRow>
							<TableCell style={{ fontWeight: "bold" }}>
								{title} - Solution
								<SortIcon
									column="name"
									sortByColumn={sortByColumn}
								/>
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Number Of Items
								<SortIcon
									column="numberOfItems"
									sortByColumn={sortByColumn}
								/>
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Capacity
								<SortIcon
									column="capacity"
									sortByColumn={sortByColumn}
								/>
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Order Score
								<SortIcon
									column="orderScore"
									sortByColumn={sortByColumn}
								/>
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Overall Score
								<SortIcon
									column="overallScore"
									sortByColumn={sortByColumn}
								/>
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Change Name
							</TableCell>
							<TableCell style={{ fontWeight: "bold" }}>
								Duplicate
							</TableCell>
							{solutions.length !== 1 ? (
								<TableCell style={{ fontWeight: "bold" }}>
									Delete
								</TableCell>
							) : null}
						</TableRow>
					</TableHead>
					<TableBody>
						{tableData.map((row) => {
							return (
								<TableRow key={row._id}>
									<TableCell>
										<Button
											style={{
												justifyContent: "flex-start",
												textAlign: "left",
											}}
											onClick={() => {
												handleClick(row._id);
											}}
										>
											{row.name}
										</Button>
									</TableCell>
									<TableCell>{row.numberOfItems}</TableCell>
									<TableCell>{row.capacity}</TableCell>
									<TableCell>{row.orderScore}</TableCell>
									<TableCell>{row.overallScore}</TableCell>

									<TableCell>
										{isLoading ? (
											<CircularProgress />
										) : (
											<IconButton
												onClick={() => {
													setShowChangeNamePopup(
														true
													);
													setTableSolutionId(row._id);
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
													handleDuplicateSolution(
														row._id
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

									{solutions.length !== 1 ? (
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
															row._id
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
					onSubmit={handleDelete}
					onClose={() => {
						setShowDeletePopup(false);
					}}
				/>
			) : null}
		</div>
	);
};
