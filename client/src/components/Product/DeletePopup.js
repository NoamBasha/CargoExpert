import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

export const DeletePopup = ({ text, id, onSubmit, onClose }) => {
	const handleSubmit = () => {
		onSubmit(id);
		onClose();
	};

	return (
		<Dialog
			open={true}
			onClose={onClose}
		>
			<DialogTitle>{text}</DialogTitle>
			<DialogActions className="d-flex justify-content-center">
				<Button onClick={onClose}>Cancel</Button>
				<Button
					className="text-danger"
					onClick={handleSubmit}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
};
