import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
import {
    FaUsers,
    FaUserTie,
    FaChartPie,
    FaPlusCircle,
    FaChartBar,
    FaUserFriends
} from "react-icons/fa";

import {

Chart as ChartJS,

CategoryScale,

LinearScale,

BarElement,

ArcElement,

Tooltip,

Legend

} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(

CategoryScale,

LinearScale,

BarElement,

ArcElement,

Tooltip,

Legend

);

function AdminDashboard() {

    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const [dashboard, setDashboard] = useState({
        users: 0,
        customers: 0
    });
    const [recentCustomers, setRecentCustomers] = useState([]);

    const barData = {
        labels: ["Users", "Customers"],
        datasets: [
            {
                label: "Count",
                data: [dashboard.users, dashboard.customers],
                backgroundColor: ["#2563eb", "#16a34a"]
            }
        ]
    };

    const doughnutData = {
        labels: ["Users", "Customers"],
        datasets: [
            {
                data: [dashboard.users, dashboard.customers],
                backgroundColor: ["#2563eb", "#16a34a"]
            }
        ]
    };

   useEffect(() => {

    loadDashboard();

    loadRecentCustomers();

}, []);
async function loadRecentCustomers() {

    try {

        const token = localStorage.getItem("token");

        const response = await api.get(

            "/customers/recent",

            {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            }

        );

        setRecentCustomers(response.data);

    }

    catch(error){

        console.log(error);

    }

}

    async function loadDashboard(){

        try{

            const token=localStorage.getItem("token");

            const response=await api.get(

                "/admin/dashboard",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            setDashboard(response.data);

        }

        catch(error){

            console.log(error);

        }

    }

    return (

        <PageWrapper>

            <>

            <Navbar />

            <div style={styles.container}>

                <div style={styles.headerCard}>

                    <h1>👑 Admin Dashboard</h1>

                    <h3>{email}</h3>

                    <p>Impact Marketing CRM</p>

                </div>

                <div style={styles.cards}>

                    <div style={styles.card}>

                        <h2><FaUsers /> Users</h2>
                        <h1>{dashboard.users}</h1>

                        <p>Total Registered Users</p>

                    </div>

                    <div style={styles.card}>

                        <h2><FaUserFriends /> Customers</h2>

                        <h1>{dashboard.customers}</h1>

                        <p>Total Customers</p>

                    </div>

                    <div style={styles.card}>

                        <h2>🚀 Impact Marketing</h2>

                        <h1 style={{color:"#16a34a"}}>

ONLINE

</h1>

                        <p>Customer Relationship Management</p>

                    </div>

                </div>
                <div style={styles.chartContainer}>

<div style={styles.chartCard}>

<h2>Users vs Customers</h2>

<Bar data={barData}/>

</div>

<div style={styles.chartCard}>

<h2>Distribution</h2>

<Doughnut data={doughnutData}/>

</div>

</div>
<div style={styles.recentCard}>

<h2>Recent Customers</h2>

{

recentCustomers.map(customer=>(

<div key={customer.id} style={styles.customerItem}>

<b>

{customer.firstName} {customer.lastName}

</b>

<br/>

{customer.mobile}

</div>

))

}

</div>

                <div style={styles.buttons}>

                    <button
                        style={styles.button}
                        onClick={()=>navigate("/manage-users")}
                    >
                        Manage Users
                    </button>

                    <button
                        style={styles.button}
                        onClick={()=>navigate("/manage-customers")}
                    >
                        Manage Customers
                    </button>

                    <button
                        style={styles.button}
                        onClick={()=>navigate("/customer")}
                    >
                        <>
<FaPlusCircle style={{marginRight:"8px"}}/>
Add Customer
</>
                    </button>

                    <button
    style={styles.button}
    onClick={() => navigate("/statistics")}
>
    <>
<FaChartBar style={{marginRight:"8px"}}/>
Statistics
</>
</button>

                </div>

            </div>

            </>

        </PageWrapper>

    );

}

const styles = {
container:{

padding:"30px",

maxWidth:"1400px",

margin:"auto",

textAlign:"center"

},

headerCard:{

background:"linear-gradient(135deg,#2563eb,#0f172a)",

color:"white",

padding:"35px",

borderRadius:"15px",

marginBottom:"35px",

boxShadow:"0 8px 25px rgba(0,0,0,.25)"

},
cards:{

display:"flex",

justifyContent:"center",

gap:"25px",

marginBottom:"40px",

flexWrap:"wrap"

},

card:{

flex:"1 1 250px",

minWidth:"250px",

background:"white",

padding:"25px",

borderRadius:"15px",

boxShadow:"0 5px 20px rgba(0,0,0,.15)"

},

buttons:{

display:"flex",

justifyContent:"center",

gap:"20px",

flexWrap:"wrap"

},

button:{

background:"#2563eb",

color:"white",

border:"none",

padding:"14px 24px",

borderRadius:"8px",

cursor:"pointer",

fontWeight:"bold",

transition:"0.3s"

},
recentCard:{

width:"100%",

maxWidth:"700px",

margin:"40px auto",

background:"white",

padding:"25px",

borderRadius:"15px",

boxShadow:"0 5px 20px rgba(0,0,0,.15)",

textAlign:"left"

},

customerItem:{

padding:"12px",

borderBottom:"1px solid #ddd"

},

chartContainer:{

    display:"flex",

    justifyContent:"center",

    gap:"40px",

    flexWrap:"wrap",

    marginBottom:"40px"

},

chartCard:{

flex:"1 1 450px",

minWidth:"320px",

background:"white",

padding:"20px",

borderRadius:"15px",

boxShadow:"0 5px 20px rgba(0,0,0,.15)"

}
};


export default AdminDashboard;