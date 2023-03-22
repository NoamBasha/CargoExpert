import { Link } from "react-router-dom";
import { useUserData } from "./UserDataProvider.js";

export const Login = () => {
	const { email, setEmail, password, setPassword, setProjects, getUserData } =
		useUserData();

	const handleLogin = async (e) => {
		getUserData();
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
