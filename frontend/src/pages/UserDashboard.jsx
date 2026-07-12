import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import CountUp from "react-countup";
import Footer from "../components/Footer";
import {
FaUser,
FaUserFriends,
FaPlusCircle
} from "react-icons/fa";

function UserDashboard() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const name = localStorage.getItem("name");

    return (

<PageWrapper>

        <>

            <Navbar />

            <div style={styles.container}>

                <div style={styles.welcomeCard}>

                    <h1 style={styles.heading}>
                        Welcome to Impact Marketing 🚀
                    </h1>

                    <h2 style={styles.name}>
                        {name || "User"}
                    </h2>

                    <h3 style={styles.email}>
                        {email}
                    </h3>

                    <p style={styles.subtitle}>
                        Customer Relationship Management System
                    </p>

                </div>

                <div style={styles.cardsContainer}>

                    <div style={styles.infoCard}>

                        <h2><FaUserFriends size={55}/></h2>

                        <h3>Customers</h3>

                        <p>

                            Add, edit and manage your customer database.

                        </p>

                    </div>

                    <div style={styles.infoCard}>

                        <h2><FaUser size={55}/></h2>

                        <h3>Profile</h3>

                        <p>

                            Logged in as <b>USER</b>

                        </p>

                    </div>

                    <div style={styles.infoCard}>

                        <h2>📈</h2>

                        <h3>Productivity</h3>

                        <p>

                            Easily organize all customer information.

                        </p>

                    </div>

                </div>

                <div style={styles.buttons}>

                    <button

                        style={styles.button}

                        onClick={() => navigate("/customer")}

                    >

                        <>
<FaPlusCircle style={{marginRight:8}}/>
Add Customer
</>

                    </button>

                    <button

                        style={styles.button}

                        onClick={() => navigate("/mycustomers")}

                    >

                        My Customers

                    </button>

                    <button

                        style={styles.button}

                        onClick={() => navigate("/profile")}

                    >

                        My Profile

                    </button>

                </div>

            </div>

            <Footer />

        </>

    </PageWrapper>

    );

}

const styles = {

    container: {

        minHeight: "100vh",

        padding: "30px",

        background: "#f3f6fb",

        textAlign: "center",

        maxWidth: "1400px",

        margin: "auto"

    },

    welcomeCard: {

        background: "linear-gradient(135deg,#2563eb,#0f172a)",

        color: "white",

        padding: "35px",

        borderRadius: "15px",

        marginBottom: "40px",

        boxShadow: "0 10px 25px rgba(0,0,0,.2)"

    },

    heading: {

        marginBottom: "10px",

        fontSize: "34px"

    },

    name: {

        marginBottom: "10px"

    },

    email: {

        opacity: "0.9",

        marginBottom: "15px"

    },

    subtitle: {

        fontSize: "18px"

    },

    cardsContainer: {

        display: "flex",

        flexWrap: "wrap",

        justifyContent: "center",

        gap: "25px",

        marginBottom: "40px"

    },

    infoCard: {

        flex: "1 1 260px",

        maxWidth: "320px",

        background: "white",

        padding: "30px",

        borderRadius: "15px",

        boxShadow: "0 5px 20px rgba(0,0,0,.15)"

    },

    buttons: {

        display: "flex",

        justifyContent: "center",

        flexWrap: "wrap",

        gap: "20px"

    },

    button: {

        background: "#2563eb",

        color: "white",

        border: "none",

        padding: "14px 26px",

        borderRadius: "8px",

        cursor: "pointer",

        fontSize: "16px",

        fontWeight: "bold"

    }

};

export default UserDashboard;