import { useState } from "react";
import { useBoxes } from "./BoxesProvider.js";
import Papa from "papaparse";

export const FileUpload = () => {
	const [fileContainer, setFileContainer] = useState([]);
	const { setDataFromUser } = useBoxes();

	const parseData = (data) => {
		console.log(data);

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

		console.log(numeric_data[0]["width"]);
		/*
		setFileContainer([
			numeric_data[0]["width"],
			numeric_data[0]["height"],
			numeric_data[0]["length"],
		]);
		console.log(fileContainer);
		*/
		let container_data = {
			width: numeric_data[0]["width"],
			height: numeric_data[0]["height"],
			length: numeric_data[0]["length"],
		};
		console.log(container_data);

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

	const fileHandler = (event) => {
		Papa.parse(event.target.files[0], {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {
				parseData(results.data);
			},
		});
	};

	return (
		<div>
			<input
				type="file"
				name="user_input"
				accept=".csv"
				onChange={fileHandler}
			/>
		</div>
	);
};
