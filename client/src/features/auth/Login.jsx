import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice.js";
import { useLoginMutation } from "./authApiSlice.js";
import { getProjects } from "../projects/projectsSlice.js";
import { toast } from "react-toastify";
import { Button, TextField, CircularProgress } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./yupSchemas.js";

const Login = () => {
    const {
        register: rfhRegister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const userData = await login(data).unwrap();
            navigate("/home");
            dispatch(setCredentials({ user: userData, token: userData.token }));
            await dispatch(getProjects()).unwrap();
        } catch (err) {
            toast.error(err?.data?.message);
        }
    };

    return (
        <div className="text-center">
            <h1 className="m-0 p-5 display-1 mt-5">Cargo Expert</h1>
            <form
                style={{ width: "20%" }}
                className="d-flex flex-column mx-auto align-items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    type="text"
                    placeholder="Email..."
                    fullWidth
                    {...rfhRegister("email")}
                />
                <p>{errors?.email?.message}</p>

                <TextField
                    className="mt-4"
                    id="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    type="password"
                    placeholder="Password..."
                    fullWidth
                    {...rfhRegister("password")}
                />
                <p>{errors?.password?.message}</p>

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
    );
};

export default Login;
