import { useState } from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
	Button,
} from "@mui/material";

export const ChangeNamePopup = ({ id, onSubmit, onClose }) => {
	const [name, setName] = useState("");

	const handleSubmit = () => {
		onSubmit(id, name);
		onClose();
	};

	return (
		<Dialog
			open={true}
			onClose={onClose}
		>
			<DialogTitle>Change Project Name</DialogTitle>
			<DialogContent>
				<TextField
					className="mt-2"
					label="New Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</DialogContent>
			<DialogActions className="d-flex justify-content-center">
				<Button onClick={onClose}>Cancel</Button>
				<Button onClick={handleSubmit}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};
