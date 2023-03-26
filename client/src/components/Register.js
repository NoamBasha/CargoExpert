import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "./UserDataProvider.js";
import "./Register.css";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const { addUser, isLoading, error } = useUserData();

	const handleRegister = async (e) => {
		let res = await addUser({ email, password });
		console.log(res);
		if (res.status != 400) {
			navigate("/");
		}
	};

	return (
		<div className="register">
			<h1 className="m-0 p-5 display-1">Cargo Expert</h1>
			<form className="form-register w-20 mx-auto">
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
				<br />
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
						onClick={handleRegister}
					>
						Register
					</Button>
				)}
			</form>
		</div>
	);
};
