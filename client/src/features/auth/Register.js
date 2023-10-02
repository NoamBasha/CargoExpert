import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useRegisterMutation } from "./authApiSlice.js";

const Register = () => {
	const emailRef = useRef();
	const errRef = useRef();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [errMsg, setErrMsg] = useState("");
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
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
			const userData = await register({
				email,
				password: pwd,
				name,
			}).unwrap();
			dispatch(setCredentials({ ...userData, email }));
			setEmail("");
			setPwd("");
			setName("");
			navigate("/home");
		} catch (err) {
			console.log(err);
			if (!err?.originalStatus) {
				setErrMsg("No Server Response");
			} else if (err.originalStatus === 400) {
				setErrMsg("Missing email or password or name");
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
	const handleNameInput = (e) => setName(e.target.value);

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<section className="login">
			<p ref={errRef}>{errMsg}</p>

			<h1>Login</h1>

			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input
					type="text"
					id="name"
					value={name}
					onChange={handleNameInput}
					required
				/>

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
				<button>Sign Up</button>
			</form>
		</section>
	);

	return content;
};

export default Register;
