function Home() {
  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.title}>
          Site Data Management System
        </h1>


        <p style={styles.text}>
          Secure customer data management portal
        </p>


        <p style={styles.subText}>
          Manage your site enquiries, customer details,
          and project information securely.
        </p>


        <div style={styles.buttons}>

          <a href="/login">
            <button style={styles.primaryBtn}>
              Login
            </button>
          </a>


          <a href="/register">
            <button style={styles.secondaryBtn}>
              Register
            </button>
          </a>


        </div>


      </div>


    </div>
  );
}



const styles = {


  container: {

    minHeight: "calc(100vh - 70px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f7fb",
    padding: "20px"

  },


  card: {

    width: "600px",
    background: "white",
    padding: "50px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)"

  },


  title: {

    fontSize: "38px",
    color: "#111827",
    marginBottom: "20px"

  },


  text: {

    fontSize: "22px",
    color: "#374151",
    marginBottom: "15px"

  },


  subText: {

    color: "#6b7280",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "35px"

  },


  buttons: {

    display: "flex",
    justifyContent: "center",
    gap: "20px"

  },


  primaryBtn: {

    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "12px 35px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"

  },


  secondaryBtn: {

    background: "#111827",
    color: "white",
    border: "none",
    padding: "12px 35px",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer"

  }


}


export default Home;