import { Button, TextField } from "@mui/material";
import { PreferencesPanel } from "./PreferencesPanel";

import "./../../../App.css";

export const ProjectSettings = ({
	name,
	setName,
	setStage,
	orderQuantity,
	setOrderQuantity,
	timeQuality,
	setTimeQuality,
}) => {
	const validateName = () => {
		if (name.trim().length === 0) {
			return false;
		}
		return true;
	};

	return (
		<form className="w-25 d-flex flex-column mt-5">
			<label className="darkBrown mb-2">Name:</label>
			<TextField
				type="text"
				id="name"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<br />

			<PreferencesPanel
				preference={orderQuantity}
				setPreference={setOrderQuantity}
				options={["Quantity", "Order"]}
				text={"Order vs Quantity:"}
			/>

			<PreferencesPanel
				preference={timeQuality}
				setPreference={setTimeQuality}
				options={["Time", "Quality"]}
				text={"Time vs Quality:"}
			/>

			<Button
				className="w-25 mx-auto mt-2 rounded"
				onClick={() => {
					if (validateName()) {
						setStage((prevStage) => prevStage + 1);
					} else {
						alert("Problem with the name");
					}
				}}
			>
				Continue
			</Button>
		</form>
	);
};
