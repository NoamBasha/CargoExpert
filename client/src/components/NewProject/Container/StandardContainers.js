import { Button } from "@mui/material";

export const StandardContainers = ({ setStandardContainer }) => {
	return (
		<div>
			<Button onClick={() => setStandardContainer(2, 2, 6)}>
				Set Standard Size - 2, 2, 6
			</Button>
			<br />

			<Button onClick={() => setStandardContainer(2, 2, 12)}>
				Set Standard Size - 2, 2, 12
			</Button>
			<br />

			<Button onClick={() => setStandardContainer(2, 3, 12)}>
				Set Standard Size - 2, 3, 12
			</Button>
		</div>
	);
};
