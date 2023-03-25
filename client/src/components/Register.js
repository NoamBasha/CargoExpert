import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		let data = await fetch(
			"http://localhost:1337/register",
			requestOptions
		);
		console.log(data);
		navigate("/");
	};

	return (
		<div>
			<form>
				<input
					value={email}
					type="text"
					placeholder="Email..."
					required
					onChange={(e) => setEmail(e.target.value)}
				/>
				<br />
				<input
					value={password}
					type="password"
					placeholder="Password..."
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />

				<button onClick={handleRegister}>Register</button>
			</form>
		</div>
	);
};
