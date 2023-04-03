import { useUserData } from "../../UserDataProvider.js";
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
import { useProject } from "../ProjectProvider.js";
import { ChangeNamePopup } from "../ChangeNamePopup.js";
import { DeletePopup } from "../DeletePopup";

export const ProjectsTable = () => {
	const { projects, deleteProject, updateProject } = useUserData();
	const { setProjectId } = useProject();
	const [tableProjectId, setTableProjectId] = useState(null);
	const [showChangeNamePopup, setShowChangeNamePopup] = useState(false);
	const [showDeletePopup, setShowDeletePopup] = useState(false);

	if (projects == null || projects.length === 0) {
		return <h3>There are no projects, please create a new project</h3>;
	}

	const handleClick = (index) => {
		setProjectId(index);
	};

	const tableData = projects.map((project) => {
		return {
			id: project.id,
			name: project.name,
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
				name: name,
			};
			updateProject(newProject);
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
											Go To Project
										</Button>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												setShowDeletePopup(true);
												setTableProjectId(row.id);
											}}
										>
											Delete Project
										</Button>
									</TableCell>
									<TableCell>
										<Button
											onClick={() => {
												setShowChangeNamePopup(true);
												setTableProjectId(row.id);
											}}
										>
											Change Name
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
		</div>
	);
};
