import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product/Product";
import NewProject from "./components/NewProject/NewProject";
import Header from "./components/Header";

import Login from "./features/auth/Login.jsx";
import Register from "./features/auth/Register.jsx";
import RequireAuth from "./features/auth/RequireAuth.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Screen = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/new_project" element={<NewProject />} />
                </Route>
                <Route path="*" element={<Login />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                progressStyle={{
                    background: "grey",
                }}
            />
        </>
    );
};

const App = () => {
    return (
        <div className="App ">
            <Screen />
        </div>
    );
};

export default App;
