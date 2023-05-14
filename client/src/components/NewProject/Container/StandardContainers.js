import { Button } from "@mui/material";

export const StandardContainers = ({ setStandardContainer }) => {
	return (
		<div className="d-flex justify-content-between mb-3">
			<Button onClick={() => setStandardContainer(2, 2, 6)}>
				Small Size <br />
				2, 2, 6
			</Button>

			<Button onClick={() => setStandardContainer(2, 2, 12)}>
				Medium Size <br />
				2, 2, 12
			</Button>

			<Button onClick={() => setStandardContainer(2, 3, 12)}>
				Large Size <br />
				2, 3, 12
			</Button>
		</div>
	);
};
