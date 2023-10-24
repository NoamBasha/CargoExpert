import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as CargoExpert } from "../CargoExpert.svg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice.js";
import { logout } from "../features/auth/authSlice.js";
import { useDispatch } from "react-redux";

export const Header = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	const currentUser = useSelector(selectCurrentUser);

	return (
		<div
			style={{ background: "#303841", height: "10vh" }}
			className="header w-100 d-flex align-items-center"
		>
			<CargoExpert
				style={{ width: "7%" }}
				className="mx-5"
			/>
			{!currentUser ? (
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
					<Button onClick={() => navigate("/home")}>Home</Button>
					<Button
						className="mx-2"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</>
			)}
		</div>
	);
};
