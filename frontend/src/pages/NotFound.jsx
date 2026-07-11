import { Link } from "react-router-dom";

function NotFound() {

    return (

        <div style={styles.container}>

            <h1 style={styles.code}>404</h1>

            <h2>Page Not Found</h2>

            <p>

                Sorry, the page you are looking for doesn't exist.

            </p>

            <Link

                to="/"

                style={styles.button}

            >

                Go Home

            </Link>

        </div>

    );

}

const styles = {

    container: {

        minHeight: "100vh",

        display: "flex",

        flexDirection: "column",

        justifyContent: "center",

        alignItems: "center",

        background: "#f5f7fb"

    },

    code: {

        fontSize: "120px",

        color: "#2563eb",

        margin: 0

    },

    button: {

        marginTop: "30px",

        background: "#2563eb",

        color: "white",

        textDecoration: "none",

        padding: "14px 30px",

        borderRadius: "8px",

        fontWeight: "bold"

    }

};

export default NotFound;