import { Button, TextField } from "@mui/material";
import { PreferencesPanel } from "./PreferencesPanel";

export const ProjectSettings = ({
	name,
	setName,
	setNewStage,
	orderQuantity,
	setOrderQuantity,
	timeQuality,
	setTimeQuality,
	setCustomizedError,
}) => {
	const validateName = () => {
		if (name.trim().length === 0) {
			return false;
		}
		return true;
	};

	return (
		<form
			style={{ width: "20%" }}
			className="d-flex flex-column"
		>
			<label className="mb-2">Name:</label>
			<TextField
				className="mb-1"
				type="text"
				id="name"
				value={name}
				onChange={(e) => {
					setName(e.target.value);
				}}
				placeholder="Project"
			/>
			{/* <label className="my-1">Preferences:</label> */}
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
				className="w-25 mx-auto mt-2"
				onClick={() => {
					if (validateName()) {
						setNewStage(1);
					} else {
						setCustomizedError("Problem with name");
					}
				}}
			>
				Continue
			</Button>
		</form>
	);
};
