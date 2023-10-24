import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useRegisterMutation } from "./authApiSlice.js";
import { toast } from "react-toastify";

const Register = () => {
	const nameRef = useRef();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const navigate = useNavigate();

	const [register, { isLoading }] = useRegisterMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		nameRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const userData = await register({
				email,
				password: pwd,
				name,
			}).unwrap();
			await dispatch(setCredentials({ ...userData, email }));
			setEmail("");
			setPwd("");
			setName("");
			navigate("/home");
		} catch (err) {
			let errMsg = "";
			if (!err?.originalStatus) {
				errMsg = "No Server Response";
			} else if (err.originalStatus === 400) {
				errMsg = "Missing email or password or name";
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
	const handleNameInput = (e) => setName(e.target.value);

	const content = isLoading ? (
		<h1>Loading...</h1>
	) : (
		<div>
			<h1>Register</h1>

			<form onSubmit={handleSubmit}>
				<label>Name:</label>
				<input
					type="text"
					id="name"
					ref={nameRef}
					value={name}
					onChange={handleNameInput}
					required
				/>

				<label>Email:</label>
				<input
					type="text"
					id="email"
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
		</div>
	);

	return content;
};

export default Register;
