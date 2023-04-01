import { useUserData } from "../UserDataProvider.js";
import "./Login.css";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Login = () => {
	const navigate = useNavigate();
	const {
		email,
		setEmail,
		password,
		setPassword,
		readUser,
		isLoading,
		error,
		isLoggedIn,
	} = useUserData();

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/projects");
		}
	}, [isLoggedIn]);

	const handleLogin = async (e) => {
		await readUser();
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
				{error && (
					<Alert
						severity="error"
						className="mt-3"
					>
						{error}
					</Alert>
				)}
				{isLoading ? (
					<CircularProgress />
				) : (
					<Button
						variant="outlined"
						onClick={handleLogin}
					>
						Login
					</Button>
				)}
			</form>
			<br />
			{isLoading ? null : (
				<Button
					variant="outlined"
					onClick={() => navigate("/register")}
				>
					Register
				</Button>
			)}
		</div>
	);
};
