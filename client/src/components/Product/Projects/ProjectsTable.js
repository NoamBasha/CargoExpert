import { Button } from "@mui/material";
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
import { ChangeNamePopup } from "../ChangeNamePopup.js";
import { DeletePopup } from "../DeletePopup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import { CircularProgress } from "@mui/material";
import {
	selectProjects,
	selectIsError,
	selectIsLoading,
	selectMessage,
	deleteProject,
	updateProject,
} from "../../../features/projects/projectsSlice.js";

import { setProjectById } from "../../../features/project/projectSlice.js";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";

export const ProjectsTable = () => {
	const projects = useSelector(selectProjects);
	const isError = useSelector(selectIsError);
	const isLoading = useSelector(selectIsLoading);
	const message = useSelector(selectMessage);

	const [tableProjectId, setTableProjectId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	const dispatch = useDispatch();

	const handleClick = (projectId) => {
		console.log(projectId);
		dispatch(setProjectById({ projects, projectId }));
	};

	const tableData = projects.map((project) => {
		return {
			_id: project._id,
			name: project.name,
		};
	});

	const handleChangeName = async (projectId, name) => {
		const project = projects.find((project) => project._id === projectId);
		if (project != null) {
			const newProject = {
				...project,
				name: name,
			};
			console.log(newProject);
			await dispatch(updateProject({ projectId, newProject }));
			if (isError) {
				toast.error(message);
			} else {
				toast.success(`Changed name to ${name}`);
			}
		}
	};

	const handleDelete = async (id) => {
		await dispatch(deleteProject(id));
		if (isError === "") {
			toast.success(`Deleted Project successfully`);
		}
	};

	if (projects == null || projects.length === 0) {
		return (
			<div
				style={{ height: "90vh" }}
				className="d-flex justify-content-center align-items-center"
			>
				<h2
					style={{ color: "#a0a0a0" }}
					className="pb-5 mb-5"
				>
					There are no projects, please create a new project
				</h2>
			</div>
		);
	} else {
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
									Project
								</TableCell>
								<TableCell style={{ fontWeight: "bold" }}>
									Change Name
								</TableCell>
								<TableCell style={{ fontWeight: "bold" }}>
									Delete
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{tableData.map((row) => {
								return (
									<TableRow key={row._id}>
										<TableCell>
											<Button
												style={{
													justifyContent:
														"flex-start",
													textAlign: "left",
												}}
												onClick={() =>
													handleClick(row._id)
												}
											>
												{row.name}
											</Button>
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
														setTableProjectId(
															row._id
														);
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
														setShowDeletePopup(
															true
														);
														setTableProjectId(
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
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
				{showChangeNamePopup ? (
					<ChangeNamePopup
						text="Change Project Name"
						id={tableProjectId}
						onSubmit={handleChangeName}
						onClose={() => setShowChangeNamePopup(false)}
					/>
				) : null}
				{showDeletePopup ? (
					<DeletePopup
						text="Delete Project?"
						id={tableProjectId}
						onSubmit={handleDelete}
						onClose={() => setShowDeletePopup(false)}
					/>
				) : null}
			</div>
		);
	}
};
