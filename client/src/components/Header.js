import { Button } from "@mui/material";
import { useUserData } from "./UserDataProvider.js";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = () => {
	const navigate = useNavigate();

	const { setEmail, setPassword, setIsLoggedIn, isLoggedIn } = useUserData();

	const logout = () => {
		setEmail("");
		setPassword("");
		setIsLoggedIn(false);
		navigate("/");
	};

	return (
		<div className="header">
			{!isLoggedIn ? null : (
				<>
					<h3>Cargo Expert</h3>
					<Button onClick={logout}>Logout</Button>
					<Button onClick={() => navigate("/projects")}>
						Projects
					</Button>
				</>
			)}
		</div>
	);
};
