function buildCustomerShareText(customers) {
    const customerList = Array.isArray(customers) ? customers : [customers];

    return customerList
        .map((customer, index) => {
            const name = [customer.salutation, customer.firstName, customer.lastName]
                .filter(Boolean)
                .join(" ")
                .trim();

            const lines = [
                `${customerList.length > 1 ? `${index + 1}. ` : ""}Customer Details`,
                `Name : ${name || "-"}`,
                `Customer Type : ${customer.customerType || "-"}`,
                `Mobile : ${customer.mobile || "-"}`,
                `City : ${customer.city || "-"}`,
                `State : ${customer.state || "-"}`,
                `Site Stage : ${customer.siteStage || "-"}`,
                `Source : ${customer.source || "-"}`,
                `Google Map : ${customer.locationLink || "-"}`
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
