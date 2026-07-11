import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";

function CustomerStatistics() {

    const [stats, setStats] = useState([]);

    useEffect(() => {

        loadStats();

    }, []);

    async function loadStats() {

        try {

            const token = localStorage.getItem("token");

const response = await api.get(

    "/customers/city-stats",

    {

        headers: {

            Authorization: `Bearer ${token}`

        }

    }

);
            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    }

    return (

        <PageWrapper>

            <>

            <Navbar />

            <div style={styles.container}>

                <h1>Customer Statistics</h1>

                <div style={styles.cards}>

                    {

                        stats.map((item,index)=>(

                            <div key={index} style={styles.card}>

                                <h2>{item.city}</h2>

                                <h1>{item.total}</h1>

                            </div>

                        ))

                    }

                </div>

            </div>

            </>

        </PageWrapper>

    );

}

const styles={

container:{

padding:"30px"

},

cards:{

display:"flex",

gap:"20px",

flexWrap:"wrap"

},

card:{

width:"220px",

background:"#2563eb",

color:"white",

padding:"25px",

borderRadius:"10px",

textAlign:"center"

}

};

export default CustomerStatistics;