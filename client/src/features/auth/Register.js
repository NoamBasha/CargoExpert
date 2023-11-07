import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useRegisterMutation } from "./authApiSlice.js";
import { toast } from "react-toastify";
import { Button, TextField, CircularProgress } from "@mui/material";


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
			toast.error(err.data.message);
		}
	};

	const handleEmailInput = (e) => setEmail(e.target.value);
	const handlePwdInput = (e) => setPwd(e.target.value);
	const handleNameInput = (e) => setName(e.target.value);

	return <div className="text-center">
	<h1 className="m-0 p-5 display-1 mt-5">Cargo Expert</h1>
	<form
		style={{ width: "20%" }}
		className="d-flex flex-column mx-auto align-items-center"
		onSubmit={handleSubmit}
	>
		<TextField
			id="name"
			label="Name"
			ref={nameRef}
			variant="outlined"
			value={name}
			type="text"
			placeholder="Name..."
			required
			onChange={handleNameInput}
			fullWidth
		/>

		<TextField
			className="mt-4"
			id="email"
			label="Email"
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
				Register
			</Button>
		)}
	</form>
</div>
};

export default Register;
