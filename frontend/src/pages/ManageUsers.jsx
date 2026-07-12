import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { toast } from "react-toastify";
import PageWrapper from "../components/PageWrapper";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";

function ManageUsers() {

    const [users, setUsers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        fetchUsers();

    }, []);

    async function fetchUsers() {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/admin/users",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setUsers(response.data);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function deleteUser(id) {

        if (!window.confirm("Delete this user?")) {

            return;

        }

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/admin/users/${id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            toast.success("User Deleted Successfully");

            fetchUsers();

        }

        catch (error) {

            toast.error("Delete Failed");

        }

    }

    const filteredUsers = users.filter(user => {

        const value = search.toLowerCase();

        return (

            user.name?.toLowerCase().includes(value) ||

            user.email?.toLowerCase().includes(value) ||

            user.role?.toLowerCase().includes(value)

        );

    });

    return (

        <PageWrapper>

            <>

            <Navbar />

            <div style={styles.container}>

                <h1 style={styles.heading}>

                    Impact Marketing - Manage Users

                </h1>

                <input

                    style={styles.search}

                    placeholder="Search by Name, Email or Role"

                    value={search}

                    onChange={(e) => setSearch(e.target.value)}

                />

                <div style={styles.tableContainer}>

                    <table style={styles.table}>

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Role</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                filteredUsers.length === 0 ?

                                <tr>
                                    <td colSpan="4">
                                        <EmptyState
                                            title="No Users Found"
                                            subtitle="There are no registered users."
                                        />
                                    </td>
                                </tr>

                                :

                                filteredUsers.map(user => (

                                    <tr key={user.id}>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>

                                            <span

                                                style={

                                                    user.role === "ADMIN"

                                                        ? styles.admin

                                                        : styles.user

                                                }

                                            >

                                                {user.role}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                user.role === "ADMIN"

                                                ?

                                                <button

                                                    style={styles.disabled}

                                                    disabled

                                                >

                                                    Protected

                                                </button>

                                                :

                                                <button

                                                    style={styles.deleteButton}

                                                    onClick={() => deleteUser(user.id)}

                                                >

                                                    Delete

                                                </button>

                                            }

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <Footer />

            </>

        </PageWrapper>

    );

}

const styles = {

    container: {

        padding: "30px",

        maxWidth: "1400px",

        margin: "auto"

    },

    heading: {

        textAlign: "center",

        marginBottom: "25px",

        color: "#2563eb"

    },

    search: {

        width: "100%",

        maxWidth: "500px",

        display: "block",

        margin: "0 auto 30px",

        padding: "14px",

        borderRadius: "8px",

        border: "1px solid #ccc",

        fontSize: "16px"

    },

    tableContainer: {

        overflowX: "auto",

        background: "white",

        borderRadius: "12px",

        boxShadow: "0 5px 20px rgba(0,0,0,.15)"

    },

    table: {

        width: "100%",

        borderCollapse: "collapse",

        minWidth: "700px"

    },

    admin: {

        background: "#16a34a",

        color: "white",

        padding: "6px 12px",

        borderRadius: "20px",

        fontWeight: "bold"

    },

    user: {

        background: "#2563eb",

        color: "white",

        padding: "6px 12px",

        borderRadius: "20px",

        fontWeight: "bold"

    },

    deleteButton: {

        background: "#dc2626",

        color: "white",

        border: "none",

        padding: "10px 18px",

        borderRadius: "6px",

        cursor: "pointer",

        fontWeight: "bold"

    },

    disabled: {

        background: "#9ca3af",

        color: "white",

        border: "none",

        padding: "10px 18px",

        borderRadius: "6px"

    }

};

export default ManageUsers;