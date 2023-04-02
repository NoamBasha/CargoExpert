import { Button, TextField } from "@mui/material";

export const ProjectSettings = ({ name, setName, setStage }) => {
	const validateName = () => {
		if (name.trim().length === 0) {
			return false;
		}
		return true;
	};

	return (
		<div>
			<form>
				<label>Name</label>
				<TextField
					type="text"
					id="name"
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<br />
				<Button
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
		</div>
	);
};
