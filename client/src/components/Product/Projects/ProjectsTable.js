import { useUserData } from "../../UserDataProvider.js";
import { Button, Snackbar } from "@mui/material";
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
import { useProject } from "../ProjectProvider.js";
import { ChangeNamePopup } from "../ChangeNamePopup.js";
import { DeletePopup } from "../DeletePopup";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";

export const ProjectsTable = () => {
	const { projects, deleteProject, updateProject } = useUserData();
	const { setProjectId } = useProject();
	const [tableProjectId, setTableProjectId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const handleClick = (index) => {
		setProjectId(index);
	};

	const tableData = projects.map((project) => {
		return {
			id: project.id,
			name: project.project_data.name,
		};
	});

	const getProjectById = (id) => {
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].id === id) {
				return projects[i];
			}
		}
		return null;
	};

	const handleChangeName = (id, name) => {
		const project = getProjectById(id);
		if (project != null) {
			const newProject = {
				...project,
				project_data: { ...project.project_data, name: name },
			};
			updateProject(newProject);
			setSnackbarMessage(`Changed name to ${name}`);
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
									<TableRow key={row.id}>
										<TableCell>
											<Button
												onClick={() =>
													handleClick(row.id)
												}
											>
												{row.name}
											</Button>
										</TableCell>
										<TableCell>
											<IconButton
												onClick={() => {
													setShowChangeNamePopup(
														true
													);
													setTableProjectId(row.id);
												}}
											>
												<EditOutlinedIcon
													color="primary"
													size="small"
												></EditOutlinedIcon>
											</IconButton>
										</TableCell>
										<TableCell>
											<IconButton
												onClick={() => {
													setShowDeletePopup(true);
													setTableProjectId(row.id);
												}}
											>
												<DeleteOutlineIcon
													color="primary"
													size="small"
												></DeleteOutlineIcon>
											</IconButton>
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
						onSubmit={deleteProject}
						onClose={() => setShowDeletePopup(false)}
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
	}
};
