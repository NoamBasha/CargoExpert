import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "./authApiSlice.js";
import { toast } from "react-toastify";
import { Button, TextField, CircularProgress } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./yupSchemas.js";

const Register = () => {
    const {
        register: rfhRegister,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const onSubmit = async (data) => {
        try {
            await register(data).unwrap();
            navigate("/home");
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
                    id="name"
                    label="Name"
                    name="name"
                    variant="outlined"
                    type="text"
                    placeholder="Name..."
                    fullWidth
                    {...rfhRegister("name")}
                />
                <p>{errors?.name?.message}</p>

                <TextField
                    className="mt-4"
                    id="email"
                    label="Email"
                    name="email"
                    variant="outlined"
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
                        Register
                    </Button>
                )}
            </form>
        </div>
    );
};

export default Register;
