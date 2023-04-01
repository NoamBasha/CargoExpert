import Papa from "papaparse";
import { Button } from "@mui/material";
import { DropzoneArea } from "material-ui-dropzone";
import { DownloadFile } from "./DownloadFile";
import "./FileUpload.css";

export const FileUpload = ({ setStage, setContainer, setBoxes }) => {
	const parseData = (data) => {
		let numeric_data = [];
		for (let i = 0; i < data.length; i++) {
			let numberic_object = {};
			for (let property in data[i]) {
				if (!isNaN(data[i][property])) {
					numberic_object[property] = parseFloat(data[i][property]);
				} else {
					numberic_object[property] = data[i][property];
				}
			}
			numberic_object = { ...numberic_object, color: "" };
			if (
				Object.values(numberic_object).includes(null) ||
				Object.values(numberic_object).includes(undefined)
			) {
				alert("boxes problem");
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
			alert("container problem");
			return;
		}

		let boxes = [];
		for (let i = 1; i < numeric_data.length; i++) {
			boxes.push(numeric_data[i]);
		}
		setContainer(container_data);
		setBoxes(boxes);
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
	};

	return (
		<div>
			<DropzoneArea
				acceptedFiles={["text/csv"]}
				dropzoneText={
					"Drag and drop a CSV file here or click to upload your file!"
				}
				filesLimit={1}
				maxFileSize={5000000}
				showAlerts={true}
				showPreviews={false}
				showFileNamesInPreview={false}
				showPreviewsInDropzone={true}
				showFileNames={true}
				getFileAddedMessage={(fileName) => `CSV file ${fileName} added`}
				getFileRemovedMessage={(fileName) =>
					`CSV file ${fileName} removed`
				}
				onDrop={(files) => handleDrop(files)}
				onDelete={handleDelete}
			/>
			<DownloadFile />
			<Button onClick={() => setStage(1)}>Continue</Button>
		</div>
	);
};
