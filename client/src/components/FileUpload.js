import { useState, useEffect } from "react";
import { useBoxes } from "./BoxesProvider.js";
import { FileUploadButton } from "./FileUploadButton.js";
import { DragAndDrop } from "./DragAndDrop.js";
import Papa from "papaparse";
import "./FileUpload.css";

export const FileUpload = () => {
	const [file, setFile] = useState(null);
	const [fileContainer, setFileContainer] = useState([]);
	const { setDataFromUser } = useBoxes();

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
			numeric_data.push(numberic_object);
		}

		let container_data = {
			width: numeric_data[0]["width"],
			height: numeric_data[0]["height"],
			length: numeric_data[0]["length"],
		};

		let boxes = [];
		for (let i = 1; i < numeric_data.length; i++) {
			boxes.push(numeric_data[i]);
		}

		let container_and_boxes = {
			container: container_data,
			boxes: boxes,
		};
		setDataFromUser(container_and_boxes);
	};

	useEffect(() => {
		if (file == null) {
			return;
		}
		console.log(file);
		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				parseData(results.data);
			},
		});
	}, [file]);

	return (
		<div className="file-upload">
			<DragAndDrop setFile={setFile}></DragAndDrop>
			Or
			<FileUploadButton setFile={setFile}></FileUploadButton>
		</div>
	);
};
