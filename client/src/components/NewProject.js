import { FileUpload } from "./FileUpload";
import { DownloadFile } from "./DownloadFile";
import { useState } from "react";
import { Link } from "react-router-dom";

export const NewProject = () => {
	return (
		<div>
			<FileUpload></FileUpload>
			<DownloadFile></DownloadFile>
			<br></br>
			<Link to="/edit_container">Continue</Link>
			<br />
			<Link to="/projects">Return to projects list</Link>
		</div>
	);
};
