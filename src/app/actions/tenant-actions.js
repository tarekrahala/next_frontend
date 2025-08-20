"use server";

export async function createTenantAction(prevState, formData) {
  try {
    const allowedFromForm = formData.getAll("allowedDestinations")
    const restrictedFromForm = formData.getAll("restrictedDestinations")
    const allowedFromText = (formData.get("allowedDestinations") || "").toString()
    const restrictedFromText = (formData.get("restrictedDestinations") || "").toString()

    const allowedList = (allowedFromForm && allowedFromForm.length > 0
      ? allowedFromForm
      : allowedFromText.split(",")
    )
      .map((s) => (typeof s === 'string' ? s.trim() : String(s)))
      .filter(Boolean)

    const restrictedList = (restrictedFromForm && restrictedFromForm.length > 0
      ? restrictedFromForm
      : restrictedFromText.split(",")
    )
      .map((s) => (typeof s === 'string' ? s.trim() : String(s)))
      .filter(Boolean)

    const body = {
      name: formData.get("name")?.trim() || "",
      domain: formData.get("domain")?.trim() || "",
      companyName: formData.get("companyName")?.trim() || "",
      contactPerson: formData.get("contactPerson")?.trim() || "",
      email: formData.get("email")?.trim() || "",
      phone: formData.get("phone")?.trim() || "",
      address: formData.get("address")?.trim() || "",
      city: formData.get("city")?.trim() || "",
      country: formData.get("country")?.trim() || "",
      postalCode: formData.get("postalCode")?.trim() || "",
      type: formData.get("type")?.trim() || "corporate",
      status: formData.get("status")?.trim() || "active",
      settings: {
        timezone: formData.get("timezone")?.trim() || "",
        currency: formData.get("currency")?.trim() || "",
        language: formData.get("language")?.trim() || "",
        businessHours: {
          start: formData.get("bh_start")?.trim() || "",
          end: formData.get("bh_end")?.trim() || "",
          timezone: formData.get("bh_timezone")?.trim() || "",
        },
        travelPolicy: {
          maxBudget: Number(formData.get("maxBudget") || 0),
          requireApproval: formData.get("requireApproval") === "on",
          allowedDestinations: allowedList,
          restrictedDestinations: restrictedList,
        },
      },
    };

    if (!body.name || !body.domain || !body.email) {
      return { success: false, message: "Name, domain and email are required" };
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
    const res = await fetch(`${baseUrl}/admin/tenants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      return { success: false, message: err?.message || "Failed to create tenant" };
    }

    return { success: true, message: "Tenant created" };
  } catch (e) {
    return { success: false, message: "Unexpected error creating tenant" };
  }
}

