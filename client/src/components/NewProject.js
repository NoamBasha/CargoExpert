import { View } from "./View.js";
import { FileUpload } from "./FileUpload";
import { DragAndDrop } from "./DragAndDrop.js";
import { Link } from "react-router-dom";
import { DownloadFile } from "./DownloadFile";

export const NewProject = () => {
	return (
		<div>
			<FileUpload></FileUpload>
			<DownloadFile></DownloadFile>
			<br></br>
			<Link to="/project">Go To Project</Link>
		</div>
	);
};
