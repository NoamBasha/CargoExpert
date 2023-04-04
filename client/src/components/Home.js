import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const BigChooseButton = ({ text, onClick }) => {
	return (
		<Button
			className="border border-primary m-1"
			style={{ width: "250px", height: "250px" }}
			onClick={onClick}
		>
			{text}
		</Button>
	);
};

export const Home = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{ height: "80vh" }}
			className="w-auto d-flex justify-content-center align-items-center"
		>
			<BigChooseButton
				text="Exisiting Projects"
				onClick={() => navigate("/product")}
			/>
			<BigChooseButton
				text="New Project"
				onClick={() => navigate("/new_project")}
			/>
		</div>
	);
};
