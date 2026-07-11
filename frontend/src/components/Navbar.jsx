import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const [menuOpen, setMenuOpen] = useState(false);

    function logout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("name");

        navigate("/login");

    }

    return (

        <nav className="navbar">

            <div className="logo">
    <div className="logo-icon">
        IM
    </div>

    <div className="logo-text">
        <span>Impact</span>
        <small>Marketing CRM</small>
    </div>
</div>

            <button
                className="menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                ☰
            </button>

            <div className={menuOpen ? "nav-links active" : "nav-links"}>

                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                </Link>

                <Link to="/customer" onClick={() => setMenuOpen(false)}>
                    Add Customer
                </Link>

                <Link to="/mycustomers" onClick={() => setMenuOpen(false)}>
                    My Customers
                </Link>

                {role === "ADMIN" && (

                    <Link
                        to="/manage-users"
                        onClick={() => setMenuOpen(false)}
                    >
                        Manage Users
                    </Link>

                )}

                {role === "ADMIN" && (

                    <Link
                        to="/manage-customers"
                        onClick={() => setMenuOpen(false)}
                    >
                        Manage Customers
                    </Link>

                )}

                {role === "ADMIN" && (

                    <Link
                        to="/statistics"
                        onClick={() => setMenuOpen(false)}
                    >
                        Statistics
                    </Link>

                )}

                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                </Link>

                <Link
                    to="/change-password"
                    onClick={() => setMenuOpen(false)}
                >
                    Change Password
                </Link>

                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;