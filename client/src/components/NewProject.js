import { FileUpload } from "./FileUpload";
import { DownloadFile } from "./DownloadFile";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export const NewProject = () => {
	const navigate = useNavigate();

	return (
		<div>
			<FileUpload></FileUpload>
			<DownloadFile></DownloadFile>
			<br></br>
			<Button onClick={() => navigate("/edit_container")}>
				Continue
			</Button>
			<br />
			<Button onClick={() => navigate("/projects")}>
				Return to projects list
			</Button>
		</div>
	);
};
