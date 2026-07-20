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
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

    const customersPerPage = 5;

    const [editingCustomer, setEditingCustomer] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [showImage, setShowImage] = useState(false);
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);

    const [editForm, setEditForm] = useState({
   

        salutation:"",
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
        customerType:"",
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

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => setIsMobile(mediaQuery.matches);

        handleResize();
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

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

            salutation:customer.salutation||"",
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
            customerType:customer.customerType||"",
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

    function toggleCustomerSelection(customerId){
        setSelectedCustomerIds((prev) => {
            if (prev.includes(customerId)) {
                return prev.filter((id) => id !== customerId);
            }
            return [...prev, customerId];
        });
    }

    async function shareSelectedCustomers(){
        if (selectedCustomerIds.length === 0) {
            toast.info("Select at least one customer to share.");
            return;
        }

        const selectedCustomers = customers.filter((customer) => selectedCustomerIds.includes(customer.id));
        const shareUrl = `https://wa.me/?text=${encodeURIComponent(selectedCustomers.map((customer) => `${customer.firstName} ${customer.lastName} - ${customer.mobile || "-"}`).join("\n"))}`;

        window.open(shareUrl, "_blank", "noopener,noreferrer");
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

            <h1 style={{ fontSize: isMobile ? "24px" : "32px" }}>Manage Customers</h1>

            <div style={styles.card}>

                <h2>Total Customers</h2>

                <h1>{customers.length}</h1>

            </div>

            <div style={{ ...styles.buttonContainer, flexDirection: isMobile ? "column" : "row" }}>

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

                <button
                    style={styles.shareSelectionButton}
                    onClick={shareSelectedCustomers}
                >
                    📤 Share Selected
                </button>

            </div>

            <input
                type="text"
                placeholder="Search Name, Mobile, City..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                style={{ ...styles.search, width: isMobile ? "100%" : "350px" }}
            />

            {isMobile ? (
                <div style={styles.cardsList}>
                    {customers.length === 0 ? (
                        <div style={styles.emptyState}>
                            <EmptyState
                                title="No Customers Found"
                                subtitle="Start by adding your first customer."
                                buttonText="Add Customer"
                                buttonLink="/customer"
                            />
                        </div>
                    ) : (
                        currentCustomers.map(customer => (
                            <div key={customer.id} style={styles.cardItem}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                                    <span style={styles.cardLabel}>Select</span>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomerIds.includes(customer.id)}
                                        onChange={() => toggleCustomerSelection(customer.id)}
                                    />
                                </div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Name</span><span>{customer.firstName} {customer.lastName}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Mobile</span><span>{customer.mobile}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>City</span><span>{customer.city}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Stage</span><span>{customer.siteStage || "-"}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Source</span><span>{customer.source || "-"}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Location</span><span>{customer.locationLink ? <a href={customer.locationLink} target="_blank" rel="noreferrer">📍 Open</a> : "-"}</span></div>
                                <div style={styles.cardRow}><span style={styles.cardLabel}>Images</span><div style={styles.imageRow}>{[customer.image1, customer.image2, customer.image3, customer.image4, customer.image5].filter(Boolean).map((img, index) => <img key={index} src={img} alt="" style={styles.thumbnail} onClick={() => { setSelectedImage(img); setShowImage(true); }} />)}</div></div>
                                <div style={styles.cardActions}>
                                    <button style={{ ...styles.viewButton, ...styles.mobileButton }} onClick={() => setSelectedCustomer(customer)}>View</button>
                                    <button style={{ ...styles.editButton, ...styles.mobileButton }} onClick={() => openEdit(customer)}>Edit</button>
                                    <button style={{ ...styles.deleteButton, ...styles.mobileButton }} onClick={() => deleteCustomer(customer.id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            ) : (
            <div style={styles.tableWrapper}>
            <table style={styles.table}>

                <thead>

                    <tr>

                        <th>Select</th>

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

                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedCustomerIds.includes(customer.id)}
                                        onChange={() => toggleCustomerSelection(customer.id)}
                                    />
                                </td>

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
            </div>
            )}
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

<p><b>Name :</b> {selectedCustomer.salutation ? `${selectedCustomer.salutation} ` : ""}{selectedCustomer.firstName} {selectedCustomer.lastName}</p>

<p><b>Customer Type :</b> {selectedCustomer.customerType || "-"}</p>

<p><b>Mobile :</b> {selectedCustomer.mobile}</p>

<p><b>House No :</b> {selectedCustomer.houseNo}</p>

<p><b>Street / Phase / Sector :</b> {selectedCustomer.street || "-"}</p>

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

                            <select
                                name="salutation"
                                value={editForm.salutation}
                                onChange={handleEditChange}
                                style={styles.input}
                            >
                                <option value="">Select Salutation</option>
                                <option>Mr</option>
                                <option>Mrs</option>
                                <option>Miss</option>
                            </select>

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
                                name="houseNo"
                                value={editForm.houseNo}
                                onChange={handleEditChange}
                                placeholder="House No"
                                style={styles.input}
                            />

                            <input
                                name="street"
                                value={editForm.street}
                                onChange={handleEditChange}
                                placeholder="Street / Phase / Sector"
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
                            <select
                                name="customerType"
                                value={editForm.customerType}
                                onChange={handleEditChange}
                                style={styles.input}
                            >
                                <option value="">Select Customer Type</option>
                                <option>Owner</option>
                                <option>Architect</option>
                                <option>Contractor</option>
                                <option>Onsite Supervisor</option>
                                <option>Other</option>
                            </select>

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

    shareSelectionButton:{
        background: "#0f766e",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        cursor: "pointer"
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

        maxWidth:"420px",

        padding:"10px",

        marginBottom:"20px",
        boxSizing:"border-box",
        borderRadius:"8px",

        border:"1px solid gray"

    },

    tableWrapper:{
        overflowX:"auto",
        borderRadius:"10px",
        border:"1px solid #ddd"
    },

    table:{

        width:"100%",

        borderCollapse:"collapse",
        border:"1px solid #ddd",
        minWidth:"900px",
        background:"white"

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

marginTop:"25px",

flexWrap:"wrap"

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
        width:"100%",
        maxWidth:"450px",
        borderRadius:"10px",
        boxShadow:"0 0 20px rgba(0,0,0,0.3)",
        maxHeight:"90vh",
        overflowY:"auto"

    },

    cardsList:{
        display:"flex",
        flexDirection:"column",
        gap:"12px"
    },

    cardItem:{
        background:"white",
        border:"1px solid #e5e7eb",
        borderRadius:"10px",
        padding:"14px",
        boxShadow:"0 2px 6px rgba(0,0,0,0.05)"
    },

    cardRow:{
        display:"flex",
        justifyContent:"space-between",
        gap:"10px",
        marginBottom:"8px",
        fontSize:"14px"
    },

    cardLabel:{
        fontWeight:"700",
        color:"#374151"
    },

    imageRow:{
        display:"flex",
        gap:"6px",
        flexWrap:"wrap",
        justifyContent:"flex-end"
    },

    thumbnail:{
        width:"44px",
        height:"44px",
        objectFit:"cover",
        borderRadius:"6px"
    },

    cardActions:{
        display:"flex",
        gap:"8px",
        marginTop:"10px",
        flexWrap:"wrap"
    },

    mobileButton:{
        flex:1,
        minWidth:"70px"
    },

    emptyState:{
        background:"white",
        borderRadius:"10px",
        border:"1px solid #e5e7eb",
        padding:"20px"
    }

};

export default ManageCustomers;