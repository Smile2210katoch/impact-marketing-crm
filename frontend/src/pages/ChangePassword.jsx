import { useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
function ChangePassword() {

    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");

    async function changePassword(){

        try{

            const token=localStorage.getItem("token");

            await api.put("/auth/change-password",{

                oldPassword,
                newPassword

            },{

                headers:{
                    Authorization:`Bearer ${token}`
                }

            });

            alert("Password Changed Successfully");

            setOldPassword("");
            setNewPassword("");

        }

        catch{

            alert("Password Change Failed");

        }

    }

    return(

        <PageWrapper>

        <>

        <Navbar/>

        <div style={styles.container}>

        <div style={styles.card}>

        <h1>Change Password</h1>

        <input

        type="password"

        placeholder="Old Password"

        value={oldPassword}

        onChange={(e)=>setOldPassword(e.target.value)}

        style={styles.input}

        />

        <input

        type="password"

        placeholder="New Password"

        value={newPassword}

        onChange={(e)=>setNewPassword(e.target.value)}

        style={styles.input}

        />

        <button

        style={styles.button}

        onClick={changePassword}

        >

        Change Password

        </button>

        </div>

        </div>

        </>

        </PageWrapper>

    );

}

const styles={

container:{
display:"flex",
justifyContent:"center",
marginTop:"60px"
},

card:{
width:"500px",
padding:"40px",
background:"white",
borderRadius:"12px",
boxShadow:"0 5px 15px rgba(0,0,0,.2)"
},

input:{
width:"100%",
padding:"12px",
marginBottom:"20px"
},

button:{
background:"#2563eb",
color:"white",
padding:"12px",
border:"none",
width:"100%",
cursor:"pointer"
}

};

export default ChangePassword;