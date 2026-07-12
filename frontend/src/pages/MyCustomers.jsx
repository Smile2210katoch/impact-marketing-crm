import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";

function MyCustomers() {

    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");

    const [editingCustomer, setEditingCustomer] = useState(null);

    const [editForm, setEditForm] = useState({

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
        source: ""

    });

    useEffect(() => {

        fetchCustomers();

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
            source: customer.source || ""

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

                <h1 style={styles.heading}>

                    My Customers

                </h1>

                <input

                    style={styles.search}

                    placeholder="Search by Name / Mobile / City"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <table style={styles.table}>

                    <thead>

                        <tr>

                            <th>First Name</th>

                            <th>Last Name</th>

                            <th>Mobile</th>

                            <th>City</th>

                            <th>Site Stage</th>

                            <th>Source</th>

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

                                            <button
                                                style={styles.editButton}
                                                onClick={() => openEdit(customer)}
                                            >
                                                Edit
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
                                        colSpan="8"
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

                {

                    editingCustomer &&

                    <div style={styles.overlay}>

                        <div style={styles.modal}>

                            <h2>

                                Edit Customer

                            </h2>

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

                            <input
                                name="source"
                                value={editForm.source}
                                onChange={handleEditChange}
                                style={styles.input}
                                placeholder="Source"
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

        marginBottom: "20px"

    },

    search: {

        width: "350px",
        padding: "10px",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid #ccc"

    },

    table: {

        width: "100%",
        borderCollapse: "collapse"

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
        alignItems: "center"

    },

    modal: {

        background: "white",
        padding: "25px",
        borderRadius: "10px",
        width: "500px",
        maxHeight: "90vh",
        overflowY: "auto"

    },

    buttonContainer: {

        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"

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

};

export default MyCustomers;