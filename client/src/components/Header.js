import { Button } from "@mui/material";
import { useUserData } from "./UserDataProvider.js";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

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
					<Button onClick={() => navigate("/home")}>
						<HomeOutlinedIcon
							color="primary"
							size="small"
						></HomeOutlinedIcon>
					</Button>
					<Button onClick={logout}>
						<LogoutOutlinedIcon
							color="primary"
							size="small"
						></LogoutOutlinedIcon>
					</Button>
				</>
			)}
		</div>
	);
};
