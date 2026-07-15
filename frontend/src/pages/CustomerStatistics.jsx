import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";

function CustomerStatistics() {

    const [stats, setStats] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");

    const [selectedImages, setSelectedImages] = useState([]);
    const [showImages, setShowImages] = useState(false);

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

        }

        catch(error){

            console.log(error);

        }

    }

    async function loadCustomers(city){

        try{

            const token = localStorage.getItem("token");

            const response = await api.get(

                `/customers/city/${city}`,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            setCustomers(response.data);

            setSelectedCity(city);

        }

        catch(error){

            console.log(error);

        }

    }

    function viewImages(customer){

        const images=[

            customer.image1,

            customer.image2,

            customer.image3,

            customer.image4,

            customer.image5

        ].filter(Boolean);

        setSelectedImages(images);

        setShowImages(true);

    }

    async function shareCustomer(customer){

        const text=`
Customer Details

Name : ${customer.firstName} ${customer.lastName}

Mobile : ${customer.mobile}

City : ${customer.city}

Site Stage : ${customer.siteStage}

Google Map :
${customer.locationLink}
`;

        if(navigator.share){

            try{

                await navigator.share({

                    title:"Customer Details",

                    text:text

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            navigator.clipboard.writeText(text);

            alert("Customer details copied to clipboard.");

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

                                <div

                                    key={index}

                                    style={styles.card}

                                    onClick={()=>loadCustomers(item.city)}

                                >

                                    <h2>{item.city}</h2>

                                    <h1>{item.total}</h1>

                                    <p>Click To View Customers</p>

                                </div>

                            ))

                        }

                    </div>

                    {

                        selectedCity && (

                            <>

                                <h2 style={{marginTop:"40px"}}>

                                    Customers From {selectedCity}

                                </h2>

                                <table style={styles.table}>

                                    <thead>

                                        <tr>

                                            <th style={styles.th}>ID</th>

                                            <th style={styles.th}>Image</th>

                                            <th style={styles.th}>Name</th>

                                            <th style={styles.th}>Mobile</th>

                                            <th style={styles.th}>Stage</th>

                                            <th style={styles.th}>Source</th>

                                            <th style={styles.th}>Location</th>

                                            <th style={styles.th}>Images</th>

                                            <th style={styles.th}>Share</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            customers.map(customer=>(

                                                <tr key={customer.id}>

                                                    <td style={styles.td}>
                                                        {customer.id}
                                                    </td>

                                                    <td style={styles.td}>

                                                        {

                                                            customer.image1 ?

                                                            <img

                                                                src={customer.image1}

                                                                alt=""

                                                                style={styles.thumbnail}

                                                            />

                                                            :

                                                            "No Image"

                                                        }

                                                    </td>

                                                    <td style={styles.td}>

                                                        {customer.firstName} {customer.lastName}

                                                    </td>

                                                    <td style={styles.td}>

                                                        {customer.mobile}

                                                    </td>

                                                    <td style={styles.td}>

                                                        {customer.siteStage}

                                                    </td>

                                                    <td style={styles.td}>

                                                        {customer.source}

                                                    </td>

                                                    <td style={styles.td}>

                                                        <a

                                                            href={customer.locationLink}

                                                            target="_blank"

                                                            rel="noreferrer"

                                                        >

                                                            Open Map

                                                        </a>

                                                    </td>

                                                    <td style={styles.td}>

                                                        <button

                                                            style={styles.viewButton}

                                                            onClick={()=>viewImages(customer)}

                                                        >

                                                            View Images

                                                        </button>

                                                    </td>

                                                    <td style={styles.td}>

                                                        <button

                                                            style={styles.shareButton}

                                                            onClick={()=>shareCustomer(customer)}

                                                        >

                                                            Share

                                                        </button>

                                                    </td>

                                                </tr>

                                            ))

                                        }

                                    </tbody>

                                </table>

                            </>

                        )

                    }
                                        {

                        showImages && (

                            <div style={styles.modal}>

                                <div style={styles.modalContent}>

                                    <h2>Customer Images</h2>

                                    <div style={styles.imageGrid}>

                                        {

                                            selectedImages.map((img,index)=>(

                                                <img

                                                    key={index}

                                                    src={img}

                                                    alt=""

                                                    style={styles.largeImage}

                                                />

                                            ))

                                        }

                                    </div>

                                    <button

                                        style={styles.closeButton}

                                        onClick={()=>setShowImages(false)}

                                    >

                                        Close

                                    </button>

                                </div>

                            </div>

                        )

                    }

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

flexWrap:"wrap",

marginBottom:"30px"

},

card:{

width:"220px",

background:"#2563eb",

color:"white",

padding:"25px",

borderRadius:"10px",

textAlign:"center",

cursor:"pointer",

transition:"0.3s"

},

table:{

width:"100%",

borderCollapse:"collapse",

marginTop:"20px",

background:"white",

boxShadow:"0 0 10px rgba(0,0,0,0.1)"

},

th:{

background:"#2563eb",

color:"white",

padding:"12px",

border:"1px solid #ddd"

},

td:{

padding:"12px",

border:"1px solid #ddd",

textAlign:"center"

},

thumbnail:{

width:"70px",

height:"70px",

objectFit:"cover",

borderRadius:"8px"

},

viewButton:{

background:"#0ea5e9",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"5px",

cursor:"pointer"

},

shareButton:{

background:"#16a34a",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"5px",

cursor:"pointer"

},

modal:{

position:"fixed",

top:0,

left:0,

width:"100%",

height:"100%",

background:"rgba(0,0,0,0.7)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:999

},

modalContent:{

background:"white",

padding:"30px",

borderRadius:"12px",

width:"80%",

maxHeight:"90%",

overflowY:"auto"

},

imageGrid:{

display:"flex",

flexWrap:"wrap",

gap:"15px",

justifyContent:"center"

},

largeImage:{

width:"280px",

height:"220px",

objectFit:"cover",

borderRadius:"10px",

boxShadow:"0 0 10px rgba(0,0,0,0.3)"

},

closeButton:{

marginTop:"25px",

background:"#dc2626",

color:"white",

border:"none",

padding:"10px 20px",

borderRadius:"5px",

cursor:"pointer"

}

};

export default CustomerStatistics;