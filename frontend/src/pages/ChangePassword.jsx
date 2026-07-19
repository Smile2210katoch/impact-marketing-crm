import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
function ChangePassword() {

    const [oldPassword,setOldPassword]=useState("");
    const [newPassword,setNewPassword]=useState("");
    const [showOldPassword,setShowOldPassword]=useState(false);
    const [showNewPassword,setShowNewPassword]=useState(false);

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

        <div style={styles.passwordWrapper}>

        <input

        type={showOldPassword?"text":"password"}

        placeholder="Old Password"

        value={oldPassword}

        onChange={(e)=>setOldPassword(e.target.value)}

        style={{...styles.input, paddingRight:"44px"}}

        />

        <button

        type="button"

        style={styles.toggleButton}

        onClick={()=>setShowOldPassword(prev=>!prev)}

        aria-label={showOldPassword?"Hide old password":"Show old password"}

        >

        {showOldPassword?<FaEyeSlash/>:<FaEye/>}

        </button>

        </div>

        <div style={styles.passwordWrapper}>

        <input

        type={showNewPassword?"text":"password"}

        placeholder="New Password"

        value={newPassword}

        onChange={(e)=>setNewPassword(e.target.value)}

        style={{...styles.input, paddingRight:"44px"}}

        />

        <button

        type="button"

        style={styles.toggleButton}

        onClick={()=>setShowNewPassword(prev=>!prev)}

        aria-label={showNewPassword?"Hide new password":"Show new password"}

        >

        {showNewPassword?<FaEyeSlash/>:<FaEye/>}

        </button>

        </div>

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

passwordWrapper:{
position:"relative"
},

toggleButton:{
position:"absolute",
right:"10px",
top:"10px",
background:"transparent",
border:"none",
color:"#2563eb",
cursor:"pointer",
fontSize:"16px"
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