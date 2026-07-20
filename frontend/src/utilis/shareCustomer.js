function buildCustomerShareText(customers) {
    const customerList = Array.isArray(customers) ? customers : [customers];

    return customerList
        .map((customer, index) => {
            const name = [customer.salutation, customer.firstName, customer.lastName]
                .filter(Boolean)
                .join(" ")
                .trim();

            const imageUrls = [
                customer.image1,
                customer.image2,
                customer.image3,
                customer.image4,
                customer.image5
            ].filter(Boolean);

            const lines = [
                `${customerList.length > 1 ? `${index + 1}. ` : ""}Customer Details`,
                `Name : ${name || "-"}`,
                `Customer Type : ${customer.customerType || "-"}`,
                `Mobile : ${customer.mobile || "-"}`,
                `House No : ${customer.houseNo || "-"}`,
                `Street / Phase / Sector : ${customer.street || "-"}`,
                `City : ${customer.city || "-"}`,
                `State : ${customer.state || "-"}`,
                `Architect Name : ${customer.architectName || "-"}`,
                `Architect Mobile : ${customer.architectMobile || "-"}`,
                `Site Stage : ${customer.siteStage || "-"}`,
                `Enquiry Type : ${customer.enquiryType || "-"}`,
                `Source : ${customer.source || "-"}`,
                `Google Map : ${customer.locationLink || "-"}`,
                `Images : ${imageUrls.length > 0 ? imageUrls.join(" | ") : "No images uploaded"}`
            ];

            return lines.join("\n");
        })
        .join("\n\n");
}

export async function shareCustomerDetails(customers) {
    const customerList = Array.isArray(customers) ? customers : [customers];
    const text = buildCustomerShareText(customerList);
    const subject = customerList.length > 1
        ? `Customer Details (${customerList.length} customers)`
        : "Customer Details";

    if (typeof navigator !== "undefined" && navigator.share) {
        try {
            await navigator.share({
                title: subject,
                text,
                url: customerList[0]?.locationLink || undefined
            });
            return true;
        } catch (error) {
            if (error?.name === "AbortError") {
                return false;
            }
        }
    }

    if (typeof window !== "undefined") {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
        const emailUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;

        if (window.innerWidth <= 768) {
            window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        } else {
            window.location.href = emailUrl;
        }
    }

    return false;
}
