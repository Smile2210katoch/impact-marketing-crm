import { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
import api from "../api/api";
import PageWrapper from "../components/PageWrapper";
import Footer from "../components/Footer";
function CustomerForm() {

    const [form, setForm] = useState({

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

    function handleChange(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    }
    function handleImageChange(e) {

    const files = Array.from(e.target.files);

    setImages(files.slice(0, 5));

}
    function handleChange(e) {

    if (e.target.name === "images") {

        setImages(Array.from(e.target.files).slice(0,5));

        return;

    }

    setForm({

        ...form,

        [e.target.name]: e.target.value

    });

}
async function uploadImage(file){

    const data=new FormData();

    data.append("file",file);

    data.append("upload_preset","impactmarketing");

    const res=await fetch(

        "https://api.cloudinary.com/v1_1/jxxxnyqp/image/upload",

        {

            method:"POST",

            body:data

        }

    );

    return await res.json();

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

        if (form.architectMobile &&
            !form.architectMobile.match(/^[0-9]{10}$/)) {
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

    uploadedUrls.push(result.secure_url);
}

form.image1 = uploadedUrls[0] || "";
form.image2 = uploadedUrls[1] || "";
form.image3 = uploadedUrls[2] || "";
form.image4 = uploadedUrls[3] || "";
form.image5 = uploadedUrls[4] || "";

    await api.post(

        "/customers/save",

        form,

        {

                    headers: {

                        Authorization: `Bearer ${token}`,

                        email: email

                    }

                }

            );

            toast.success("Customer Added Successfully");

            setForm({

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
                locationLink: "",
                image1: "",
                image2: "",
                image3: "",
                image4: "",
                image5: ""

            });

            setImages([]);

        }

        catch (error) {

            console.log(error);

            toast.error("Failed To Add Customer");

        }

        finally {
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
                            placeholder="Street"
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

<option>Other</option>

</select>
<input
    name="locationLink"
    type="url"
    placeholder="Google Maps Location Link"
    value={form.locationLink}
    onChange={handleChange}
    style={styles.input}
/>
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