import { FileUpload } from "./FileUpload/FileUpload";
import { DownloadFile } from "./FileUpload/DownloadFile";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import "./NewProject.css";

export const NewProject = () => {
	const navigate = useNavigate();

	return (
		<div className="new-project">
			<h1>Upload File</h1>
			<FileUpload className="middle-1" />
			<DownloadFile className="middle-2" />
			<Button
				className="bottom-right"
				onClick={() => navigate("/edit_container")}
			>
				Continue
			</Button>
		</div>
	);
};
