import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../UserDataProvider.js";
import { Button, TextField, Alert, CircularProgress } from "@mui/material";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [isRegistered, setIsRegistered] = useState(false);
	const { createUser, isLoading, error, setCustomizedError } = useUserData();

	useEffect(() => {
		if (isRegistered) {
			navigate("/");
		}
	}, [isRegistered]);

	const handleRegister = async (e) => {
		setIsRegistered(false);
		if (email.length === 0) {
			setCustomizedError("Invalid Email!");
		} else if (password.length === 0) {
			setCustomizedError("Invalid Password!");
		} else {
			await createUser({ email, password, setIsRegistered });
		}
	};

	return (
		<div className="text-center">
			<h1 className="m-0 p-5 display-1 mt-5">Cargo Expert</h1>
			<form
				style={{ width: "20%" }}
				className="d-flex flex-column mx-auto align-items-center"
			>
				<TextField
					id="email"
					label="Email"
					variant="outlined"
					value={email}
					type="text"
					placeholder="Email..."
					required
					onChange={(e) => setEmail(e.target.value.trim())}
					fullWidth
				/>
				<TextField
					className="mt-4"
					id="password"
					label="Password"
					variant="outlined"
					value={password}
					type="password"
					placeholder="Password..."
					required
					onChange={(e) => setPassword(e.target.value.trim())}
					fullWidth
				/>
				{/* {error && (
					// TODO: align text of error to center?
					<Alert
						style={{ width: "100%" }}
						className="mt-2"
						severity="error"
					>
						{error}
					</Alert>
				)} */}
				{isLoading ? (
					<CircularProgress className="mt-2" />
				) : (
					<Button
						style={{ width: "25%" }}
						className="mt-3"
						color="primary"
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
