import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaLock,
    FaChartLine
} from "react-icons/fa";

import api from "../api/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({

        email: "",
        password: ""

    });

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await api.post(

                "/auth/login",

                form

            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("email", form.email);
            localStorage.setItem("name", response.data.name);
            console.log(response.data);

            toast.success("Login Successful");

            if (response.data.role === "ADMIN") {

                navigate("/admin");

            }

            else {

                navigate("/dashboard");

            }

        }

        catch (error) {

            console.log(error);

            toast.error("Invalid Email or Password");

        }

    }

    return (

        <div className="login-page">

            <motion.div

                className="login-left"

                initial={{ opacity: 0, x: -80 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ duration: .7 }}

            >

                <FaChartLine className="brand-icon" />

                <h1>

                    Impact Marketing

                </h1>

                <h3>

                    Customer Relationship Management

                </h3>

                <p>

                    Manage your customers, sales leads,
                    business growth and analytics
                    from one professional dashboard.

                </p>

            </motion.div>

            <motion.div

                className="login-right"

                initial={{ opacity: 0, x: 80 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ duration: .7 }}

            >

                <form

                    className="login-card"

                    onSubmit={handleSubmit}

                >

                    <h2>

                        Welcome Back

                    </h2>

                    <span>

                        Login to continue

                    </span>

                    <div className="input-group">

                        <FaEnvelope />

                        <input

                            type="email"

                            name="email"

                            placeholder="Email Address"

                            value={form.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="input-group">

                        <FaLock />

                        <input

                            type="password"

                            name="password"

                            placeholder="Password"

                            value={form.password}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <button>

                        Login

                    </button>

                    <p className="register-text">

                        Don't have an account?

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </form>

            </motion.div>

        </div>

    );

}

export default Login;