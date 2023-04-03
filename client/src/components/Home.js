import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const Home = () => {
	const navigate = useNavigate();

	return (
		<div>
			<Button onClick={() => navigate("/product")}>
				Go To Exisiting Projects
			</Button>
			<br />
			<Button onClick={() => navigate("/new_project")}>
				Create a New Project
			</Button>
		</div>
	);
};
