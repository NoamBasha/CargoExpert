import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";
import { getProjects } from "../projects/projectsSlice.js";

const Login = () => {
	const emailRef = useRef();
	const errRef = useRef();
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const navigate = useNavigate();

	const [login, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		emailRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [email, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const userData = await login({ email, password: pwd }).unwrap();
			dispatch(setCredentials({ user: userData, token: userData.token }));
			setEmail("");
			setPwd("");
			dispatch(getProjects());
			navigate("/home");
		} catch (err) {
			console.log(err);
			if (!err?.originalStatus) {
				setErrMsg("No Server Response");
			} else if (err.originalStatus === 400) {
				setErrMsg("Missing email or password");
			} else if (err.originalStatus === 401) {
				setErrMsg("Unauthorized");
			} else {
				setErrMsg("Login Failed");
			}
			errRef.current.focus();
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);
	const handlePwdInput = (e) => setPwd(e.target.value);

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="login">
			<p ref={errRef}>{errMsg}</p>

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
		</section>
	);

	return content;
};

export default Login;
