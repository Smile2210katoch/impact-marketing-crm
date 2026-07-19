import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaChartLine,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import api from "../api/api";
import "./Register.css";

function Register() {

    const [form, setForm] = useState({

        name: "",
        email: "",
        password: ""

    });
    const [showPassword, setShowPassword] = useState(false);

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await api.post("/users/register", form);

            toast.success("Registration Successful");

            setForm({

                name: "",
                email: "",
                password: ""

            });

        }

        catch (error) {

            console.log(error);

            toast.error("Registration Failed");

        }

    }

    return (

        <div className="register-page">

            <motion.div

                className="register-left"

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

                    Join the CRM platform and start managing
                    your customers professionally with analytics,
                    reports and centralized data management.

                </p>

            </motion.div>

            <motion.div

                className="register-right"

                initial={{ opacity: 0, x: 80 }}

                animate={{ opacity: 1, x: 0 }}

                transition={{ duration: .7 }}

            >

                <form

                    className="register-card"

                    onSubmit={handleSubmit}

                >

                    <h2>Create Account</h2>

                    <span>

                        Register to continue

                    </span>

                    <div className="input-group">

                        <FaUser />

                        <input

                            type="text"

                            name="name"

                            placeholder="Full Name"

                            value={form.name}

                            onChange={handleChange}

                            required

                        />

                    </div>

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

                            type={showPassword ? "text" : "password"}

                            name="password"

                            placeholder="Password"

                            value={form.password}

                            onChange={handleChange}

                            required

                        />

                        <button

                            type="button"

                            className="password-toggle"

                            onClick={() => setShowPassword((prev) => !prev)}

                            aria-label={showPassword ? "Hide password" : "Show password"}

                        >

                            {showPassword ? <FaEyeSlash /> : <FaEye />}

                        </button>

                    </div>

                    <button>

                        Register

                    </button>

                    <p className="login-text">

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </p>

                </form>

            </motion.div>

        </div>

    );

}

export default Register;