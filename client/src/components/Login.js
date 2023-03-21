import { Link } from "react-router-dom";
import { useUserData } from "./UserDataProvider.js";

export const Login = () => {
	const { email, setEmail, password, setPassword, setProjects } =
		useUserData();

	const handleLogin = async (e) => {
		// TODO: remove e.preventDefault()
		//e.preventDefault();
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		};
		let projects = await fetch(
			"http://localhost:1337/getUser",
			requestOptions
		);
		projects = await projects.json();
		console.log(projects);
		setProjects(projects);
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
					to="/projects"
					onClick={handleLogin}
				>
					<button>Login</button>
				</Link>
			</form>
		</div>
	);
};
