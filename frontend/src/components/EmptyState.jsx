import { FaFolderOpen } from "react-icons/fa";
import { Link } from "react-router-dom";

function EmptyState({ title, subtitle, buttonText, buttonLink }) {

    return (

        <div style={styles.container}>

            <FaFolderOpen size={70} color="#2563eb" />

            <h2>{title}</h2>

            <p>{subtitle}</p>

            {buttonText && (

                <Link
                    to={buttonLink}
                    style={styles.button}
                >

                    {buttonText}

                </Link>

            )}

        </div>

    );

}

const styles = {

    container: {

        textAlign: "center",

        padding: "70px 20px",

        background: "#fff",

        borderRadius: "15px",

        boxShadow: "0 5px 15px rgba(0,0,0,.08)",

        marginTop: "30px"

    },

    button: {

        display: "inline-block",

        marginTop: "20px",

        padding: "12px 24px",

        background: "#2563eb",

        color: "#fff",

        borderRadius: "8px",

        textDecoration: "none",

        fontWeight: "bold"

    }

};

export default EmptyState;