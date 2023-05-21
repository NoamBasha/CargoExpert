import React, { useState } from "react";
import {
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export const ExplanationIcon = ({ explanationHeader, explanationText }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton onClick={handleOpen}>
				<HelpOutlineOutlinedIcon
					size="small"
					color="primary"
				/>
			</IconButton>
			<Dialog
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>{explanationHeader}</DialogTitle>
				<DialogContent sx={{ whiteSpace: "pre-line" }}>
					<Typography>{explanationText}</Typography>
				</DialogContent>
			</Dialog>
		</>
	);
};
