import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

export const CustomizedSnackbar = ({ buttonText, severity, snackbarText }) => {
	const [open, setOpen] = useState(false);

	const handleClick = () => {
		setOpen(true);
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="outlined"
				onClick={handleClick}
			>
				{buttonText}
			</Button>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={handleClose}
			>
				<MuiAlert
					onClose={handleClose}
					severity={severity}
					sx={{ width: "100%" }}
					elevation={6}
					variant="filled"
				>
					{snackbarText}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};
