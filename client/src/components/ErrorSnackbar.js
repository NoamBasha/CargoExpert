import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

export const ErrorSnackbar = ({ open, setOpen, text }) => {
	return (
		<div>
			<Snackbar
				open={open}
				autoHideDuration={4000}
				onClose={() => {
					setOpen(false);
				}}
			>
				<MuiAlert
					variant="filled"
					color="error"
					onClose={() => {
						setOpen(false);
					}}
					style={{ color: "white", backgroundColor: "#EE2222" }}
					severity="error"
					sx={{ width: "100%" }}
					elevation={6}
				>
					{text}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};
