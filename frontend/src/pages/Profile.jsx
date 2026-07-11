import Navbar from "../components/Navbar";
import { FaUserCircle } from "react-icons/fa";
import PageWrapper from "../components/PageWrapper";
function Profile() {

    const user = {

        name: localStorage.getItem("name") || "User",

        email: localStorage.getItem("email"),

        role: localStorage.getItem("role")

    };

    return (

        <PageWrapper>

            <>

            <Navbar />

            <div style={styles.container}>

                <div style={styles.card}>

                    <div style={styles.avatar}>

                        {user.name.charAt(0).toUpperCase()}

                    </div>

                    <h1 style={styles.title}>

                        Impact Marketing

                    </h1>

                    <p style={styles.subtitle}>

                        Customer Relationship Management

                    </p>

                    <hr style={styles.hr} />

                    <div style={styles.row}>

                        <span style={styles.label}>Full Name</span>

                        <span style={styles.value}>{user.name}</span>

                    </div>

                    <div style={styles.row}>

                        <span style={styles.label}>Email</span>

                        <span style={styles.value}>{user.email}</span>

                    </div>

                    <div style={styles.row}>

                        <span style={styles.label}>Role</span>

                        <span

                            style={

                                user.role === "ADMIN"

                                    ? styles.admin

                                    : styles.user

                            }

                        >

                            {user.role}

                        </span>

                    </div>

                </div>

            </div>

            </>

        </PageWrapper>

    );

}

const styles = {

    container: {

        minHeight: "100vh",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        background: "#f4f6fb",

        padding: "25px"

    },

    card: {

        width: "100%",

        maxWidth: "500px",

        background: "white",

        padding: "40px",

        borderRadius: "18px",

        textAlign: "center",

        boxShadow: "0 10px 30px rgba(0,0,0,.15)"

    },

    avatar: {

        width: "110px",

        height: "110px",

        borderRadius: "50%",

        margin: "0 auto 20px",

        background: "#2563eb",

        color: "white",

        fontSize: "42px",

        fontWeight: "bold",

        display: "flex",

        justifyContent: "center",

        alignItems: "center"

    },

    title: {

        color: "#2563eb",

        marginBottom: "8px"

    },

    subtitle: {

        color: "#666",

        marginBottom: "25px"

    },

    hr: {

        marginBottom: "25px"

    },

    row: {

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "15px 0",

        borderBottom: "1px solid #eee"

    },

    label: {

        fontWeight: "bold",

        color: "#444"

    },

    value: {

        color: "#555"

    },

    admin: {

        background: "#16a34a",

        color: "white",

        padding: "6px 14px",

        borderRadius: "20px",

        fontWeight: "bold"

    },

    user: {

        background: "#2563eb",

        color: "white",

        padding: "6px 14px",

        borderRadius: "20px",

        fontWeight: "bold"

    }

};

export default Profile;