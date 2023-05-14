import { Button } from "@mui/material";
import { useUserData } from "./UserDataProvider.js";
import { useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { ReactComponent as CargoExpert } from "./CargoExpert.svg";

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
		<div
			style={{ background: "#303841", height: "10vh" }}
			className="header w-100 d-flex align-items-center"
		>
			<CargoExpert
				style={{ width: "7%" }}
				className="mx-5"
			/>
			{!isLoggedIn ? (
				<>
					<Button onClick={() => navigate("/login")}>Login</Button>
					<Button
						className="mx-2"
						onClick={() => navigate("/register")}
					>
						Register
					</Button>
				</>
			) : (
				<>
					<Button onClick={() => navigate("/home")}>
						Home
						{/* <HomeOutlinedIcon
							color="primary"
							size="small"
						></HomeOutlinedIcon> */}
					</Button>
					<Button
						className="mx-2"
						onClick={logout}
					>
						Logout
						{/* <LogoutOutlinedIcon
							color="primary"
							size="small"
						></LogoutOutlinedIcon> */}
					</Button>
				</>
			)}
		</div>
	);
};
