import FileDownload from "js-file-download";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const DEV = true;

export const DownloadFile = () => {
	const DOWNLOAD_FILE_ERROR =
		"Can't download file at this time. Please try again later.";

	const handleClick = async (e) => {
		e.preventDefault();
		try {
			let response;
			if (DEV) {
				response = await fetch(
					"http://localhost:1337/userInputExample"
				);
			} else {
				response = await fetch(
					"https://cargoexpert.onrender.com/userInputExample"
				);
			}

			if (response.status === 200) {
				const resBlob = await response.blob();
				FileDownload(resBlob, "user_input_example_from_server.csv");
			} else {
				const data = await response.json();
				toast.error(data.error);
			}
		} catch (err) {
			toast.error(DOWNLOAD_FILE_ERROR);
		}
	};

	return (
		<div className="mt-0 mb-0">
			<Button
				style={{
					fontSize: "0.75rem",
				}}
				onClick={handleClick}
			>
				Download example file
			</Button>
		</div>
	);
};
