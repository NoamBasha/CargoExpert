import { Button, TextField } from "@mui/material";

export const ProjectSettings = ({ name, setName, setStage }) => {
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
				<Button onClick={() => setStage((prevStage) => prevStage + 1)}>
					Continue
				</Button>
			</form>
		</div>
	);
};
