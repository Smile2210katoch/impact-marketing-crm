import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
import { shareCustomerDetails } from "../utilis/shareCustomer";

function MyCustomers() {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

    const [editingCustomer, setEditingCustomer] = useState(null);

    const [editForm, setEditForm] = useState({

    salutation: "",
    firstName: "",
    lastName: "",
    mobile: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    architectName: "",
    architectMobile: "",
    siteStage: "",
    enquiryType: "",
    source: "",
        customerType: "",
    locationLink: "",

    image1: "",
    image2: "",
    image3: "",
    image4: "",
    image5: ""

});

    useEffect(() => {

        fetchCustomers();

    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => setIsMobile(mediaQuery.matches);

        handleResize();
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    async function fetchCustomers() {

        try {

            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");

            const response = await api.get(
                "/customers/my-data",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        email: email
                    }
                }
            );

            setCustomers(response.data);

        }
        catch (error) {

            console.error(error);
            alert("Unable to load customers.");

        }

    }

    async function shareCustomer(customer) {
        await shareCustomerDetails(customer);
    }

    async function deleteCustomer(id) {

        if (!window.confirm("Delete this customer?")) {

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/customers/delete/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            fetchCustomers();

        }
        catch (error) {

            console.error(error);

            alert("Delete failed.");

        }

    }

    function openEdit(customer) {

        setEditingCustomer(customer);

        setEditForm({

            salutation: customer.salutation || "",
            firstName: customer.firstName || "",
            lastName: customer.lastName || "",
            mobile: customer.mobile || "",
            houseNo: customer.houseNo || "",
            street: customer.street || "",
            city: customer.city || "",
            state: customer.state || "",
            architectName: customer.architectName || "",
            architectMobile: customer.architectMobile || "",
            siteStage: customer.siteStage || "",
            enquiryType: customer.enquiryType || "",
            source: customer.source || "",
            customerType: customer.customerType || "",
            locationLink: customer.locationLink || "",
            image1: customer.image1 || "",
            image2: customer.image2 || "",
            image3: customer.image3 || "",
            image4: customer.image4 || "",
            image5: customer.image5 || ""

        });

    }

    function handleEditChange(e) {

        setEditForm({

            ...editForm,

            [e.target.name]: e.target.value

        });

    }

    async function updateCustomer() {

        try {

            const token = localStorage.getItem("token");

            await api.put(

                `/customers/update/${editingCustomer.id}`,

                editForm,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            alert("Customer Updated Successfully");

            setEditingCustomer(null);

            fetchCustomers();

        }
        catch (error) {

            console.error(error);

            alert("Update Failed");

        }

    }

    const filteredCustomers = customers.filter((customer) => {

        const value = search.toLowerCase();

        return (

            customer.firstName?.toLowerCase().includes(value) ||

            customer.lastName?.toLowerCase().includes(value) ||

            customer.mobile?.includes(value) ||

            customer.city?.toLowerCase().includes(value)

        );

    });

    return (

        <PageWrapper>

            <>

            <Navbar />

            <div style={styles.container}>

                <h1 style={{ ...styles.heading, fontSize: isMobile ? "24px" : "32px" }}>

                    My Customers

                </h1>

                <input

                    style={{ ...styles.search, width: isMobile ? "100%" : "350px" }}

                    placeholder="Search by Name / Mobile / City"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                {isMobile ? (
                    <div style={styles.cardsList}>
                        {filteredCustomers.length > 0 ? (
                            filteredCustomers.map(customer => (
                                <div key={customer.id} style={styles.card}>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Name</span>
                                        <span>{customer.firstName} {customer.lastName}</span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Mobile</span>
                                        <span>{customer.mobile}</span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>City</span>
                                        <span>{customer.city}</span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Stage</span>
                                        <span>{customer.siteStage || "-"}</span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Source</span>
                                        <span>{customer.source || "-"}</span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Location</span>
                                        <span>
                                            {customer.locationLink ? (
                                                <a href={customer.locationLink} target="_blank" rel="noreferrer">📍 Open</a>
                                            ) : "-"}
                                        </span>
                                    </div>
                                    <div style={styles.cardRow}>
                                        <span style={styles.cardLabel}>Images</span>
                                        <div style={styles.imageRow}>
                                            {[
                                                customer.image1,
                                                customer.image2,
                                                customer.image3,
                                                customer.image4,
                                                customer.image5
                                            ].filter(Boolean).map((img, index) => (
                                                <img key={index} src={img} alt="" style={styles.thumbnail} />
                                            ))}
                                        </div>
                                    </div>
                                    <div style={styles.cardActions}>
                                        <button style={{ ...styles.editButton, ...styles.mobileActionButton }} onClick={() => openEdit(customer)}>
                                            Edit
                                        </button>
                                        <button style={{ ...styles.shareButton, ...styles.mobileActionButton }} onClick={() => shareCustomer(customer)}>
                                            Share
                                        </button>
                                        <button style={{ ...styles.deleteButton, ...styles.mobileActionButton }} onClick={() => deleteCustomer(customer.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={styles.emptyState}>No customers found</div>
                        )}
                    </div>
                ) : (
                    <div style={styles.tableWrapper}>
                        <table style={styles.table}>

                            <thead>

                                <tr>

                                    <th>First Name</th>

                                    <th>Last Name</th>

                                    <th>Mobile</th>

                                    <th>City</th>

                                    <th>Site Stage</th>

                                    <th>Source</th>
                                    <th>Location</th>
                                    <th>Images</th>
                                    <th>Edit</th>

                                    <th>Delete</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    filteredCustomers.length > 0 ? (

                                        filteredCustomers.map(customer => (

                                            <tr key={customer.id}>

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
            📍 Open
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

        ].filter(Boolean).map((img,index)=>(

            <img
                key={index}
                src={img}
                alt=""
                style={{
                    width:"60px",
                    height:"60px",
                    objectFit:"cover",
                    borderRadius:"8px"
                }}
            />

        ))}

    </div>

</td>

<td>

    

                                            <button
                                                style={styles.editButton}
                                                onClick={() => openEdit(customer)}
                                            >
                                                Edit
                                            </button>

                                        </td>

                                        <td>

                                            <button
                                                style={styles.shareButton}
                                                onClick={() => shareCustomer(customer)}
                                            >
                                                Share
                                            </button>

                                        </td>

                                        <td>

                                            <button
                                                style={styles.deleteButton}
                                                onClick={() => deleteCustomer(customer.id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td
                                        colSpan="10"
                                        style={{
                                            textAlign: "center",
                                            padding: "30px",
                                            fontSize: "18px",
                                            color: "#666",
                                            fontWeight: "600"
                                        }}
                                    >
                                        No customers found
                                    </td>
                                </tr>

                            )

                        }

                    </tbody>

                </table>
                    </div>
                )}

                {

                    editingCustomer &&

                    <div style={styles.overlay}>

                        <div style={styles.modal}>

                            <h2>

                                Edit Customer

                            </h2>

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

                                style={styles.input}

                                placeholder="First Name"

                            />

                            <input

                                name="lastName"

                                value={editForm.lastName}

                                onChange={handleEditChange}

                                style={styles.input}

                                placeholder="Last Name"

                            />

                            <input

                                name="mobile"

                                value={editForm.mobile}

                                onChange={handleEditChange}

                                style={styles.input}

                                placeholder="Mobile"

                            />

                            <input

                                name="city"

                                value={editForm.city}

                                onChange={handleEditChange}

                                style={styles.input}

                                placeholder="City"

                            />
                                                        <input
                                name="state"
                                value={editForm.state}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="State"
                            />

                            <input
                                name="architectName"
                                value={editForm.architectName}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Architect Name"
                            />

                            <input
                                name="architectMobile"
                                value={editForm.architectMobile}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Architect Mobile"
                            />

                            <input
                                name="siteStage"
                                value={editForm.siteStage}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Site Stage"
                            />

                            <input
                                name="enquiryType"
                                value={editForm.enquiryType}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Enquiry Type"
                            />

                            <input                                name="houseNo"
                                value={editForm.houseNo}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="House No"
                            />

                            <input
                                name="street"
                                value={editForm.street}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Street / Phase / Sector"
                            />

                            <input                                name="source"
                                value={editForm.source}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Source"
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
                                style={styles.input}
                                placeholder="Google Maps Link"
                            />

                            <div style={styles.buttonContainer}>

                                <button
                                    style={styles.updateButton}
                                    onClick={updateCustomer}
                                >
                                    Update
                                </button>

                                <button
                                    style={styles.cancelButton}
                                    onClick={() => setEditingCustomer(null)}
                                >
                                    Cancel
                                </button>

                            </div>

                        </div>

                    </div>

                }

            </div>

            </>

        </PageWrapper>

    );

}

const styles = {

    container: {

        padding: "30px"

    },

    heading: {

        marginBottom: "20px",
        color: "#111827"

    },

    search: {

        maxWidth: "420px",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        boxSizing: "border-box"

    },

    tableWrapper: {
        overflowX: "auto",
        borderRadius: "10px",
        border: "1px solid #e5e7eb"
    },

    table: {

        width: "100%",
        borderCollapse: "collapse",
        minWidth: "900px",
        background: "white"

    },

    input: {

        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxSizing: "border-box"

    },

    editButton: {

        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer"

    },

    shareButton: {

        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer"

    },

    deleteButton: {

        background: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer"

    },

    overlay: {

        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
        boxSizing: "border-box"

    },

    modal: {

        background: "white",
        padding: "25px",
        borderRadius: "10px",
        width: "100%",
        maxWidth: "500px",
        maxHeight: "90vh",
        overflowY: "auto"

    },

    buttonContainer: {

        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginTop: "15px",
        flexWrap: "wrap"

    },

    updateButton: {

        background: "#16a34a",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer"

    },

    cancelButton: {

        background: "#6b7280",
        color: "white",
        border: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        cursor: "pointer"

    }
    ,
    cardsList: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },

    card: {
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "10px",
        padding: "14px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
    },

    cardRow: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
        marginBottom: "8px",
        fontSize: "14px"
    },

    cardLabel: {
        fontWeight: "700",
        color: "#374151"
    },

    imageRow: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
        justifyContent: "flex-end"
    },

    thumbnail: {
        width: "44px",
        height: "44px",
        objectFit: "cover",
        borderRadius: "6px"
    },

    cardActions: {
        display: "flex",
        gap: "8px",
        marginTop: "10px"
    },

    mobileActionButton: {
        flex: 1,
        padding: "8px 10px"
    },

    emptyState: {
        textAlign: "center",
        padding: "30px",
        fontSize: "18px",
        color: "#666",
        fontWeight: "600",
        background: "white",
        borderRadius: "10px",
        border: "1px solid #e5e7eb"
    }

};

export default MyCustomers;