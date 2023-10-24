import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { toast } from "react-toastify";

export const DeletePopup = ({ text, id, onSubmit, onClose }) => {
	const handleSubmit = () => {
		if (!isNaN(id) && id >= 0) {
			onSubmit(id);
		} else {
			toast.error("Could not delete");
		}
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
