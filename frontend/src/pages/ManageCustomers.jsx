import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
function ManageCustomers() {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const customersPerPage = 5;

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [showImage, setShowImage] = useState(false);

    const [editForm, setEditForm] = useState({
   

        firstName:"",
        lastName:"",
        mobile:"",
        houseNo:"",
        street:"",
        city:"",
        state:"",
        architectName:"",
        architectMobile:"",
        siteStage:"",
        enquiryType:"",
        source:"",
        locationLink:"",
        image1:"",
        image2:"",
        image3:"",
        image4:"",
        image5:""

    });

    useEffect(()=>{

        loadCustomers();

    },[]);

    async function loadCustomers(){

        try{

            const token=localStorage.getItem("token");

            const response=await api.get(

                "/customers/all",

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            setCustomers(response.data);

        }

        catch(error){

            console.log(error);

            alert("Unable to load customers.");

        }

    }

    async function downloadExcel(){

        try{

            const token=localStorage.getItem("token");

            const response=await api.get(

                "/admin/export/excel",

                {

                    responseType:"blob",

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            const url=window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link=document.createElement("a");

            link.href=url;

            link.setAttribute(

                "download",

                "customers.xlsx"

            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch(error){

           toast.error("Excel Download Failed");

        }

    }

    async function downloadPdf(){

        try{

            const token=localStorage.getItem("token");

            const response=await api.get(

                "/admin/export/pdf",

                {

                    responseType:"blob",

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            const url=window.URL.createObjectURL(

                new Blob([response.data])

            );

            const link=document.createElement("a");

            link.href=url;

            link.setAttribute(

                "download",

                "customers.pdf"

            );

            document.body.appendChild(link);

            link.click();

            link.remove();

        }

        catch(error){

            alert("PDF Download Failed");

        }

    }

    async function deleteCustomer(id){

        if(!window.confirm("Delete Customer?"))

            return;

        try{

            const token=localStorage.getItem("token");

            await api.delete(

                "/customers/delete/"+id,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            loadCustomers();

        }

        catch(error){

            alert("Delete Failed");

        }

    }

    function openEdit(customer){

        setEditingCustomer(customer);

        setEditForm({

            firstName:customer.firstName||"",
            lastName:customer.lastName||"",
            mobile:customer.mobile||"",
            houseNo:customer.houseNo||"",
            street:customer.street||"",
            city:customer.city||"",
            state:customer.state||"",
            architectName:customer.architectName||"",
            architectMobile:customer.architectMobile||"",
            siteStage:customer.siteStage||"",
            enquiryType:customer.enquiryType||"",
            source:customer.source||"",
            locationLink:customer.locationLink||"",
            image1:customer.image1||"",
            image2:customer.image2||"",
            image3:customer.image3||"",
            image4:customer.image4||"",
            image5:customer.image5||""

        });

    }

    function handleEditChange(e){

        setEditForm({

            ...editForm,

            [e.target.name]:e.target.value

        });

    }

    async function updateCustomer(){

        try{

            const token=localStorage.getItem("token");

            await api.put(

                "/customers/update/"+editingCustomer.id,

                editForm,

                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );

            alert("Customer Updated");

            setEditingCustomer(null);

            loadCustomers();

        }

        catch(error){

            alert("Update Failed");

        }

    }

    const filteredCustomers=customers.filter(customer=>{

        const value=search.toLowerCase();

        return(

            customer.firstName?.toLowerCase().includes(value)||

            customer.lastName?.toLowerCase().includes(value)||

            customer.mobile?.includes(value)||

            customer.city?.toLowerCase().includes(value)

        );

    });
    const indexOfLastCustomer = currentPage * customersPerPage;

const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

const currentCustomers = filteredCustomers.slice(

    indexOfFirstCustomer,

    indexOfLastCustomer

);

const totalPages = Math.ceil(

    filteredCustomers.length / customersPerPage

);
return (

    <PageWrapper>

        <>

        <Navbar />

        <div style={styles.container}>

            <h1>Manage Customers</h1>

            <div style={styles.card}>

                <h2>Total Customers</h2>

                <h1>{customers.length}</h1>

            </div>

            <div style={styles.buttonContainer}>

                <button
                    style={styles.excelButton}
                    onClick={downloadExcel}
                >
                    📊 Export Excel
                </button>

                <button
                    style={styles.pdfButton}
                    onClick={downloadPdf}
                >
                    📄 Export PDF
                </button>

            </div>

            <input
                type="text"
                placeholder="Search Name, Mobile, City..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                style={styles.search}
            />

            <table style={styles.table}>

                <thead>

                    <tr>

                        <th>ID</th>

                        <th>First Name</th>

                        <th>Last Name</th>

                        <th>Mobile</th>

                        <th>City</th>

                        <th>Stage</th>

                        <th>Source</th>

<th>Location</th>

<th>Images</th>

<th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        customers.length === 0 ?

                        <tr>
                            <td colSpan="10">
                                <EmptyState
                                    title="No Customers Found"
                                    subtitle="Start by adding your first customer."
                                    buttonText="Add Customer"
                                    buttonLink="/customer"
                                />
                            </td>
                        </tr>

                        :

                        customers.map(customer=>(

                            <tr key={customer.id}>

                                <td>{customer.id}</td>

                                <td>{customer.firstName}</td>

                                <td>{customer.lastName}</td>

                                <td>{customer.mobile}</td>

                                <td>{customer.city}</td>

                                <td>{customer.siteStage}</td>

                               <td>{customer.source}</td>

<td>

    {

        customer.locationLink ?

        <a
            href={customer.locationLink}
            target="_blank"
            rel="noreferrer"
        >

            📍 Open Map

        </a>

        :

        "-"

    }

</td>


<td>

<div
style={{
display:"flex",
gap:"5px",
flexWrap:"wrap"
}}
>

{[
customer.image1,
customer.image2,
customer.image3,
customer.image4,
customer.image5
]

.filter(Boolean)

.map((img,index)=>(

<img

key={index}

src={img}

alt=""

style={{

width:"60px",

height:"60px",

objectFit:"cover",

borderRadius:"8px",
cursor:"pointer"

}}

onClick={() => {

setSelectedImage(img);

setShowImage(true);

}}

/>

))}

</div>

</td>

<td>

    <button

                                        style={styles.viewButton}

                                        onClick={()=>setSelectedCustomer(customer)}

                                    >

                                        View

                                    </button>

                                </td>

                                <td>

                                    <button

                                        style={styles.editButton}

                                        onClick={()=>openEdit(customer)}

                                    >

                                        Edit

                                    </button>

                                </td>

                                <td>

                                    <button

                                        style={styles.deleteButton}

                                        onClick={()=>deleteCustomer(customer.id)}

                                    >

                                        Delete

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>
            <div style={styles.pagination}>

<button

disabled={currentPage===1}

style={styles.pageButton}

onClick={()=>setCurrentPage(currentPage-1)}

>

Previous

</button>

<span>

Page {currentPage} of {totalPages}

</span>

<button

disabled={currentPage===totalPages}

style={styles.pageButton}

onClick={()=>setCurrentPage(currentPage+1)}

>

Next

</button>

</div>
            {selectedCustomer && (

<div style={styles.modal}>

<div style={styles.modalContent}>

<h2>Customer Details</h2>

<p><b>Name :</b> {selectedCustomer.firstName} {selectedCustomer.lastName}</p>

<p><b>Mobile :</b> {selectedCustomer.mobile}</p>

<p><b>House No :</b> {selectedCustomer.houseNo}</p>

<p><b>Street :</b> {selectedCustomer.street}</p>

<p><b>City :</b> {selectedCustomer.city}</p>

<p><b>State :</b> {selectedCustomer.state}</p>

<p><b>Architect :</b> {selectedCustomer.architectName}</p>

<p><b>Architect Mobile :</b> {selectedCustomer.architectMobile}</p>

<p><b>Stage :</b> {selectedCustomer.siteStage}</p>

<p><b>Enquiry :</b> {selectedCustomer.enquiryType}</p>

<p><b>Source :</b> {selectedCustomer.source}</p>
<p>

<b>Google Map :</b>

{

selectedCustomer.locationLink ?

<a

href={selectedCustomer.locationLink}

target="_blank"

rel="noreferrer"

>

 Open Map

</a>

:

" - "

}

</p>

<div
style={{
display:"flex",
gap:"10px",
flexWrap:"wrap",
marginTop:"15px"
}}
>

{[
selectedCustomer.image1,
selectedCustomer.image2,
selectedCustomer.image3,
selectedCustomer.image4,
selectedCustomer.image5
]

.filter(Boolean)

.map((img,index)=>(

<img

key={index}

src={img}

alt=""

style={{

width:"120px",

height:"120px",

borderRadius:"10px",

objectFit:"cover"

}}

/>

))}

</div>

<button

style={styles.cancelButton}

onClick={()=>setSelectedCustomer(null)}

>

Close

</button>

</div>

</div>

)}

            {

                editingCustomer && (

                    <div style={styles.modal}>

                        <div style={styles.modalContent}>

                            <h2>Edit Customer</h2>

                            <input
                                name="firstName"
                                value={editForm.firstName}
                                onChange={handleEditChange}
                                placeholder="First Name"
                                style={styles.input}
                            />

                            <input
                                name="lastName"
                                value={editForm.lastName}
                                onChange={handleEditChange}
                                placeholder="Last Name"
                                style={styles.input}
                            />

                            <input
                                name="mobile"
                                value={editForm.mobile}
                                onChange={handleEditChange}
                                placeholder="Mobile"
                                style={styles.input}
                            />

                            <input
                                name="city"
                                value={editForm.city}
                                onChange={handleEditChange}
                                placeholder="City"
                                style={styles.input}
                            />

                            <input
                                name="siteStage"
                                value={editForm.siteStage}
                                onChange={handleEditChange}
                                placeholder="Site Stage"
                                style={styles.input}
                            />

                            <input
                                name="source"
                                value={editForm.source}
                                onChange={handleEditChange}
                                placeholder="Source"
                                style={styles.input}
                            />
                            <input
name="locationLink"
value={editForm.locationLink}
onChange={handleEditChange}
placeholder="Google Maps Link"
style={styles.input}
/>

                            <button
                                style={styles.saveButton}
                                onClick={updateCustomer}
                            >
                                Save Changes
                            </button>

                            <button
                                style={styles.cancelButton}
                                onClick={()=>setEditingCustomer(null)}
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                )

            }
            {showImage && (

                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.8)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999
                    }}
                >

                    <div
                        style={{
                            position: "relative",
                            background: "white",
                            padding: "20px",
                            borderRadius: "10px"
                        }}
                    >

                        <button
                            onClick={() => setShowImage(false)}
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                padding: "8px 12px",
                                cursor: "pointer"
                            }}
                        >
                            ✖
                        </button>

                        <img
                            src={selectedImage}
                            alt="Full"
                            style={{
                                maxWidth: "90vw",
                                maxHeight: "80vh",
                                borderRadius: "10px"
                            }}
                        />

                    </div>

                </div>

            )}

        
        </div>

        <Footer />

        </>

    </PageWrapper>

);

}

const styles = {

    container:{

        padding:"30px"

    },

    card:{

        width:"250px",

        background:"#2563eb",

        color:"white",

        padding:"20px",

        borderRadius:"10px",

        marginBottom:"20px",

        textAlign:"center"

    },

    buttonContainer:{

        display:"flex",

        gap:"15px",

        marginBottom:"20px"

    },

    excelButton:{

        background:"#16a34a",

        color:"white",

        border:"none",

        padding:"10px 18px",

        borderRadius:"6px",

        cursor:"pointer"

    },

    pdfButton:{

        background:"#dc2626",

        color:"white",

        border:"none",

        padding:"10px 18px",

        borderRadius:"6px",

        cursor:"pointer"

    },

    search:{

        width:"350px",

        padding:"10px",

        marginBottom:"20px",

        borderRadius:"8px",

        border:"1px solid gray"

    },

    table:{

        width:"100%",

        borderCollapse:"collapse",

        border:"1px solid #ddd"

    },

    input:{

        width:"100%",

        padding:"10px",

        marginBottom:"10px",

        borderRadius:"5px",

        border:"1px solid gray",

        boxSizing:"border-box"

    },
    viewButton:{

background:"#0ea5e9",

color:"white",

border:"none",

padding:"8px 15px",

borderRadius:"5px",

cursor:"pointer"

},

    editButton:{

        background:"#2563eb",

        color:"white",

        border:"none",

        padding:"8px 15px",

        borderRadius:"5px",

        cursor:"pointer"

    },

    deleteButton:{

        background:"#dc2626",

        color:"white",

        border:"none",

        padding:"8px 15px",

        borderRadius:"5px",

        cursor:"pointer"

    },

    saveButton:{

        background:"#16a34a",

        color:"white",

        border:"none",

        padding:"10px 20px",

        marginRight:"10px",

        borderRadius:"5px",

        cursor:"pointer"

    },

    cancelButton:{

        background:"gray",

        color:"white",

        border:"none",

        padding:"10px 20px",

        borderRadius:"5px",

        cursor:"pointer"

    },
    pagination:{

display:"flex",

justifyContent:"center",

alignItems:"center",

gap:"20px",

marginTop:"25px"

},

pageButton:{

background:"#2563eb",

color:"white",

border:"none",

padding:"10px 20px",

borderRadius:"5px",

cursor:"pointer"

},

    modal:{

        position:"fixed",

        top:0,

        left:0,

        width:"100%",

        height:"100%",

        background:"rgba(0,0,0,0.5)",

        display:"flex",

        justifyContent:"center",

        alignItems:"center"

    },

    modalContent:{

        background:"white",

        padding:"30px",

        width:"450px",

        borderRadius:"10px",

        boxShadow:"0 0 20px rgba(0,0,0,0.3)"

    }

};

export default ManageCustomers;