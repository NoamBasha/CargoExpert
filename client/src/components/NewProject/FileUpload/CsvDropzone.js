import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

export const CsvDropzone = () => {
	const handleAcceptedFiles = (files) => {
		// Handle accepted files
	};

	const isCsvFile = (file) => {
		return file.name.endsWith(".csv") && file.type === "text/csv";
	};

	return (
		<DropzoneArea
			acceptedFiles={["text/csv"]}
			dropzoneText={"Drag and drop a CSV file here or click"}
			filesLimit={1}
			maxFileSize={5000000}
			showAlerts={true}
			showPreviews={false}
			getFileAddedMessage={(fileName) => `CSV file ${fileName} added`}
			getFileRemovedMessage={(fileName) => `CSV file ${fileName} removed`}
			onDropAccepted={(files) => handleAcceptedFiles(files)}
			getFileValidationError={(file) => {
				if (!isCsvFile(file)) {
					return "Invalid file type. Please upload a CSV file.";
				}
				return "";
			}}
		/>
	);
};
