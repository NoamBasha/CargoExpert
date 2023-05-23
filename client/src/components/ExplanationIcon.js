import React, { useState } from "react";
import {
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	Typography,
	Popover,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

export const ExplanationIcon = ({
	explanationHeader,
	explanationText,
	isPopover,
}) => {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleOpen = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleOpen}>
				<HelpOutlineOutlinedIcon
					size="small"
					color="primary"
				/>
			</IconButton>
			{isPopover ? (
				<Popover
					open={open}
					anchorEl={anchorEl}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
					transformOrigin={{
						vertical: "bottom",
						horizontal: "left",
					}}
					onClose={handleClose}
				>
					<Typography sx={{ p: 2 }}>{explanationText}</Typography>
				</Popover>
			) : (
				<Dialog
					open={open}
					onClose={handleClose}
				>
					<DialogTitle>{explanationHeader}</DialogTitle>
					<DialogContent sx={{ whiteSpace: "pre-line" }}>
						<Typography>{explanationText}</Typography>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};
