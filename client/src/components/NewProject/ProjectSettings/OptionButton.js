import React, { useState } from "react";
import { Button } from "@mui/material";

export const OptionButton = ({ preference, option, setOption }) => {
	return (
		<Button
			variant={preference == option ? "contained" : "outlined"}
			onClick={() => setOption(option)}
		>
			{option}
		</Button>
	);
};
