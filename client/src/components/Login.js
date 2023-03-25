import { useUserData } from "./UserDataProvider.js";
import "./Login.css";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();

	const { email, setEmail, password, setPassword, getUserData } =
		useUserData();

	const handleLogin = async (e) => {
		getUserData();
		navigate("/projects");
	};

	return (
		<div className="login">
			<h1 className="m-0 p-5 display-1">Cargo Expert</h1>
			<form className="form-login w-20 mx-auto">
				<TextField
					className="my-3"
					id="email"
					label="Email"
					variant="outlined"
					value={email}
					type="text"
					placeholder="Email..."
					required
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
				/>
				<br />
				<TextField
					className="my-3"
					id="password"
					label="Password"
					variant="outlined"
					value={password}
					type="password"
					placeholder="Password..."
					required
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
				/>

				<Button
					variant="outlined"
					onClick={handleLogin}
				>
					Login
				</Button>
			</form>
			<br />
			<Button
				variant="outlined"
				onClick={() => navigate("/projects")}
			>
				Register
			</Button>
		</div>
	);
};
