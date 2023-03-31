import FileDownload from "js-file-download";
import { Button, TextField } from "@mui/material";

export const DownloadFile = () => {
	const handleClick = async (e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:1337/userInputExample");
			const res_blob = await res.blob();
			FileDownload(res_blob, "user_input_example_from_server.csv");
		} catch (err) {
			alert("Could not download file, server disconnected");
		}
	};

	return (
		<div>
			<Button onClick={handleClick}>
				Click Here To Download Example File
			</Button>
		</div>
	);
};
