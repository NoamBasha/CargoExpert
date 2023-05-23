import Papa from "papaparse";
import { Button } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { DownloadFile } from "./DownloadFile";
import { useState, useEffect } from "react";
import "./FileUpload.css";

export const FileUpload = ({
	setNewStage,
	setContainer,
	setBoxes,
	setCustomizedError,
}) => {
	const [fileName, setFileName] = useState(null);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	useEffect(() => {
		handleDelete();
	}, []);

	const parseData = (data) => {
		try {
			let numeric_data = [];
			for (let i = 0; i < data.length; i++) {
				let numberic_object = {};
				for (let property in data[i]) {
					if (!isNaN(data[i][property])) {
						numberic_object[property] = parseFloat(
							data[i][property]
						);
					} else {
						numberic_object[property] = data[i][property];
					}
				}
				numberic_object = {
					id: i,
					...numberic_object,
					color: "",
					isIn: 0,
				};
				if (
					Object.values(numberic_object).includes(null) ||
					Object.values(numberic_object).includes(undefined)
				) {
					setCustomizedError("Problem with boxes");
					return;
				}
				numeric_data.push(numberic_object);
			}

			let container_data = {
				width: numeric_data[0]["width"],
				height: numeric_data[0]["height"],
				length: numeric_data[0]["length"],
			};

			if (
				container_data.height == null ||
				container_data.width == null ||
				container_data.length == null
			) {
				setCustomizedError("Problem with container");
				return;
			}

			let boxes = [];
			for (let i = 1; i < numeric_data.length; i++) {
				boxes.push(numeric_data[i]);
			}
			setContainer(Object.values(container_data));
			setBoxes(boxes);
		} catch (err) {
			setCustomizedError("Error pasring the file");
		}
	};

	const handleDrop = (files) => {
		try {
			Papa.parse(files[0], {
				header: true,
				skipEmptyLines: true,
				complete: function (results) {
					parseData(results.data);
				},
			});
		} catch (e) {
			alert("Error parsing");
		}
	};

	const handleDelete = () => {
		setContainer([]);
		setBoxes([]);
		setFileName(null);
	};

	return (
		<div className="d-flex flex-column align-items-center w-25">
			<p className="mb-0">
				You may upload a CSV file which contains the information about
				<br />
				your container and boxes. You may find an example file here:
			</p>
			<DownloadFile setCustomizedError={setCustomizedError} />
			{/* {fileName ? (
				<strong>
					<p className="mt-0 mb-2">
						{`${fileName} was uploaded successfully`}
					</p>
				</strong>
			) : (
				<p className="mt-0 mb-2">{"Currently no file is uploaded"}</p>
			)} */}
			<DropzoneArea
				dropzoneClass={
					"fileUpload px-4 text-secondary d-flex align-items-center w-100"
				}
				acceptedFiles={["text/csv"]}
				dropzoneText={
					fileName ? (
						<strong>{fileName} was uploaded successfully</strong>
					) : (
						`Drop a CSV file or click to upload your file!`
					)
				}
				filesLimit={1}
				maxFileSize={5000000}
				showAlerts={false} // false?
				showPreviews={false}
				showFileNamesInPreview={false}
				showPreviewsInDropzone={false} // true?
				showFileNames={false} // true?
				getFileAddedMessage={(fileName) => {
					setFileName(fileName);
					setSnackbarMessage(`CSV file ${fileName} added`);
					return `CSV file ${fileName} added`;
				}}
				getFileRemovedMessage={(fileName) => {
					setFileName(null);
					setSnackbarMessage(`CSV file ${fileName} removed`);
					return `CSV file ${fileName} removed`;
				}}
				onDrop={(files) => handleDrop(files)}
				onDelete={handleDelete}
				alertSnackbarProps={{}}
			/>

			<div className="w-100 d-flex justify-content-between">
				<Button onClick={() => setNewStage(-1)}>Back</Button>
				<Button onClick={() => setNewStage(1)}>Continue</Button>
			</div>
		</div>
	);
};
