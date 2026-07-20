import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
import Footer from "../components/Footer";
function CustomerForm() {

    const [form, setForm] = useState({

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

    const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);
const [images, setImages] = useState([]);

function buildGoogleMapsLink(details) {
    const parts = [details.houseNo, details.street, details.city, details.state]
        .filter(Boolean)
        .map((value) => value.trim());

    if (parts.length === 0) {
        return "";
    }

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(parts.join(" "))}`;
}

function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = {
        ...form,
        [name]: value
    };

    setForm(updatedForm);

    const addressFields = ["houseNo", "street", "city", "state"];
    if (addressFields.includes(name) && !updatedForm.locationLink) {
        const generatedLink = buildGoogleMapsLink(updatedForm);
        if (generatedLink) {
            setForm({ ...updatedForm, locationLink: generatedLink });
        }
    }
}

function handleGenerateLocationLink() {
    const generatedLink = buildGoogleMapsLink(form);
    if (generatedLink) {
        setForm({ ...form, locationLink: generatedLink });
        toast.success("Google Maps link generated");
    } else {
        toast.error("Add house number, street, city or state first");
    }
}

function handleImageChange(e) {

    const files = Array.from(e.target.files);

    console.log("Files Selected:", files);
    console.log("Total Files:", files.length);

    setImages(files.slice(0, 5));
}

async function handleSubmit(e) {

    e.preventDefault();

    setMessage("");

    if (!form.firstName.trim()) {
        setMessage("First Name is required.");
        return;
    }

    if (!form.mobile.match(/^[0-9]{10}$/)) {
        setMessage("Enter a valid 10-digit Mobile Number.");
        return;
    }

    if (
        form.architectMobile &&
        !form.architectMobile.match(/^[0-9]{10}$/)
    ) {
        setMessage("Architect Mobile must be 10 digits.");
        return;
    }

    if (!form.city.trim()) {
        setMessage("City is required.");
        return;
    }

    if (!form.state.trim()) {
        setMessage("Please select a State.");
        return;
    }

    setLoading(true);

    try {

        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        console.log("Images State:", images);
        console.log("Images Count:", images.length);

        const uploadedUrls = [];

        for (const image of images) {

            const data = new FormData();

            data.append("file", image);
            data.append("upload_preset", "impactmarketing");

            const response = await fetch(
                "https://api.cloudinary.com/v1_1/jxxxnyqp/image/upload",
                {
                    method: "POST",
                    body: data
                }
            );

            const result = await response.json();

            console.log(result);

            uploadedUrls.push(result.secure_url);
        }

        const customerData = {

            ...form,

            image1: uploadedUrls[0] || "",
            image2: uploadedUrls[1] || "",
            image3: uploadedUrls[2] || "",
            image4: uploadedUrls[3] || "",
            image5: uploadedUrls[4] || ""

        };

        console.log(customerData);

        await api.post(
            "/customers/save",
            customerData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    email: email
                }
            }
        );

        toast.success("Customer Added Successfully");

        setForm({
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

        setImages([]);

    } catch (error) {

        console.log(error);

        toast.error("Failed To Add Customer");

    } finally {

        setLoading(false);

    }
}

    return (

        <PageWrapper>

            <div>

            <Navbar />

            <div style={styles.container}>

                <form

                    style={styles.card}

                    onSubmit={handleSubmit}

                >

                    <h1 style={styles.title}>

                        Impact Marketing

                    </h1>

                    <p style={styles.subtitle}>

                        Add New Customer

                    </p>

                    <div style={styles.grid}>

                        <select
                            name="salutation"
                            value={form.salutation}
                            onChange={handleChange}
                            style={styles.input}
                        >
                            <option value="">Select Salutation</option>
                            <option>Mr</option>
                            <option>Mrs</option>
                            <option>Miss</option>
                        </select>

                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <input
                            name="mobile"
                            placeholder="Mobile Number"
                            value={form.mobile}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        <input
                            name="houseNo"
                            placeholder="House Number"
                            value={form.houseNo}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="street"
                            placeholder="Street / Phase / Sector"
                            value={form.street}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="city"
                            placeholder="City"
                            value={form.city}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />

                        
                        <select
name="state"
value={form.state}
onChange={handleChange}
style={styles.input}
>

<option value="">Select State</option>

<option>Punjab</option>
<option>Haryana</option>
<option>Himachal Pradesh</option>
<option>Delhi</option>
<option>Chandigarh</option>
<option>Jammu & Kashmir</option>
<option>Rajasthan</option>

</select>

                        <input
                            name="architectName"
                            placeholder="Architect Name"
                            value={form.architectName}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <input
                            name="architectMobile"
                            placeholder="Architect Mobile"
                            value={form.architectMobile}
                            onChange={handleChange}
                            style={styles.input}
                        />

                        <select
name="siteStage"
value={form.siteStage}
onChange={handleChange}
style={styles.input}
>

<option value="">Select Site Stage</option>

<option>Planning</option>

<option>Foundation</option>

<option>Construction</option>

<option>Roofing</option>

<option>Finishing</option>

<option>Completed</option>

</select>

                        <select
name="enquiryType"
value={form.enquiryType}
onChange={handleChange}
style={styles.input}
>

<option value="">Select Enquiry Type</option>

<option>Walk In</option>

<option>Phone Call</option>

<option>Website</option>

<option>Reference</option>

<option>Social Media</option>

</select>

                        <select
name="customerType"
value={form.customerType}
onChange={handleChange}
style={styles.input}
>

<option value="">Select Customer Type</option>

<option>Owner</option>
<option>Tenant</option>
<option>Builder</option>
<option>Investor</option>
<option>Other</option>

</select>

                        <select
name="source"
value={form.source}
onChange={handleChange}
style={styles.input}
>

<option value="">Lead Source</option>

<option>Facebook</option>

<option>Instagram</option>

<option>Google</option>

<option>WhatsApp</option>

<option>Reference</option>

<option>Newspaper</option>

<option>Offline</option>

<option>Other</option>

</select>
<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
    <input
        name="locationLink"
        type="url"
        placeholder="Paste or generate Google Maps link"
        value={form.locationLink}
        onChange={handleChange}
        style={styles.input}
    />
    <button
        type="button"
        onClick={handleGenerateLocationLink}
        style={{ ...styles.input, cursor: "pointer", background: "#eff6ff", color: "#1d4ed8", fontWeight: "600" }}
    >
        Generate Google Maps Link
    </button>
</div>
<div>

<label style={{fontWeight:"bold"}}>

Upload Site Images (Maximum 5)

</label>

<input
    type="file"
    multiple
    accept="image/*"
    onChange={handleImageChange}
    style={styles.input}
/>

</div>
                    </div>
                    {images.length > 0 && (
                        <div
                            style={{
                                display:"flex",
                                gap:"10px",
                                flexWrap:"wrap",
                                marginTop:"10px"
                            }}
                        >
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt="preview"
                                    style={{
                                        width:"120px",
                                        height:"120px",
                                        borderRadius:"10px",
                                        objectFit:"cover"
                                    }}
                                />
                            ))}
                        </div>
                    )}

                    <button
    type="submit"
    style={styles.button}
    disabled={loading}
>
    {loading ? "Saving..." : "Save Details"}
</button>

                    <p style={styles.message}>

                        {message}

                    </p>

                </form>

            </div>

            <Footer />

            </div>

        </PageWrapper>

    );

}

const styles = {

    container: {

        minHeight: "100vh",

        background: "#f4f6fb",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",

        padding: "30px"

    },

    card: {

        width: "100%",

        maxWidth: "900px",

        background: "white",

        padding: "35px",

        borderRadius: "15px",

        boxShadow: "0 10px 30px rgba(0,0,0,.15)"

    },

    title: {

        textAlign: "center",

        color: "#2563eb",

        marginBottom: "10px"

    },

    subtitle: {

        textAlign: "center",

        marginBottom: "30px",

        color: "#666"

    },

    grid: {

        display: "grid",

        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

        gap: "18px"

    },

    input: {

        padding: "14px",

        border: "1px solid #ccc",

        borderRadius: "8px",

        fontSize: "15px"

    },

    button:{

    padding:"12px",

    background:"#2563eb",

    color:"white",

    border:"none",

    borderRadius:"6px",

    cursor:"pointer",

    fontSize:"16px",

    transition:"0.3s"

},



    message: {

        marginTop: "15px",

        textAlign: "center",

        fontWeight: "bold",

        color: "green"

    }

};

export default CustomerForm;