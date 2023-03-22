import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

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

				<Link
					to="/"
					onClick={handleRegister}
				>
					<button>Register</button>
				</Link>
			</form>
		</div>
	);
};
