import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";
import { getProjects } from "../projects/projectsSlice.js";
import { toast } from "react-toastify";
import { Button, TextField, CircularProgress } from "@mui/material";


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

	 return <div className="text-center">
			<h1 className="m-0 p-5 display-1 mt-5">Cargo Expert</h1>
			<form
				style={{ width: "20%" }}
				className="d-flex flex-column mx-auto align-items-center"
				onSubmit={handleSubmit}
			>
				<TextField
					id="email"
					label="Email"
					ref={emailRef}
					variant="outlined"
					value={email}
					type="text"
					placeholder="Email..."
					required
					onChange={handleEmailInput}
					fullWidth
				/>
				<TextField
					className="mt-4"
					id="password"
					label="Password"
					variant="outlined"
					value={pwd}
					type="password"
					placeholder="Password..."
					required
					onChange={handlePwdInput}
					fullWidth
				/>
				{isLoading ? (
					<CircularProgress className="mt-2" />
				) : (
					<Button
						type="submit"
						className="mt-3 px-3"
						color="primary"
						variant="outlined"
					>
						Sign in
					</Button>
				)}
			</form>
		</div>
};

export default Login;
