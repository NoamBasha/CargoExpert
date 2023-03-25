import { FileUpload } from "./FileUpload";
import { DownloadFile } from "./DownloadFile";
import { useNavigate } from "react-router-dom";

export const NewProject = () => {
	const navigate = useNavigate();

	return (
		<div>
			<FileUpload></FileUpload>
			<DownloadFile></DownloadFile>
			<br></br>
			<button onClick={() => navigate("/edit_container")}>
				Continue
			</button>
			<br />
			<button onClick={() => navigate("/projects")}>
				Return to projects list
			</button>
		</div>
	);
};
