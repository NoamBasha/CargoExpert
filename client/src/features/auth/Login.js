import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";
import { getProjects } from "../projects/projectsSlice.js";
import { toast } from "react-toastify";

const Login = () => {
	const emailRef = useRef();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await login({ email, password: pwd }).unwrap();
			navigate("/home");
			setEmail("");
			setPwd("");
			await dispatch(
				setCredentials({ user: userData, token: userData.token })
			);
			await dispatch(getProjects());
		} catch (err) {
			let errMsg = "";
			if (!err?.originalStatus) {
				errMsg = "No Server Response";
			} else if (err.originalStatus === 400) {
				errMsg = "Missing email or password";
			} else if (err.originalStatus === 401) {
				errMsg = "Unauthorized";
			} else {
				errMsg = "Login Failed";
			}
			toast.error(errMsg);
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);
	const handlePwdInput = (e) => setPwd(e.target.value);

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<div>
			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<label>Email:</label>
				<input
					type="text"
					id="email"
					ref={emailRef}
					value={email}
					onChange={handleEmailInput}
					required
				/>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					onChange={handlePwdInput}
					value={pwd}
					required
				/>
				<button>Sign In</button>
			</form>
		</div>
	);

	return content;
};

export default Login;
