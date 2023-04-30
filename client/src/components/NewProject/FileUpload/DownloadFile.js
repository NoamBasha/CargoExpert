import FileDownload from "js-file-download";
import { Button, TextField } from "@mui/material";

export const DownloadFile = () => {
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				"http://localhost:1337/userInputExample"
			);
			if (response.status === 200) {
				const res_blob = await response.blob();
				FileDownload(res_blob, "user_input_example_from_server.csv");
			} else {
				throw new Error(`${response.status} ${response.statusText}`);
			}
		} catch (err) {
			alert("Can't download file at this time. Please try again later.");
		}
	};

	return (
		<div className="mt-3 mb-2">
			<Button onClick={handleClick}>Click here for example file</Button>
		</div>
	);
};
