interface AgileContact {
  name: string;
  mobile: string;
  email: string;
  city: string;
  courseInterested: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string;
  source: string;
}

type AgileProperty = {
  type: string;
  name: string;
  value: string;
  subtype?: string;
};

export async function pushToAgile(contact: AgileContact): Promise<void> {
  const domain = process.env.AGILE_CRM_DOMAIN;
  const email = process.env.AGILE_CRM_EMAIL;
  const apiKey = process.env.AGILE_CRM_API_KEY;

  console.log("[Agile] env check — domain:", !!domain, "email:", !!email, "apiKey:", !!apiKey);
  if (!domain || !email || !apiKey) {
    console.log("[Agile] missing env vars, skipping push");
    return;
  }

  const [firstName, ...rest] = contact.name.trim().split(" ");
  const lastName = rest.join(" ") || "";
  const auth = Buffer.from(`${email}:${apiKey}`).toString("base64");

  const properties: AgileProperty[] = [
    { type: "SYSTEM", name: "first_name", value: firstName },
    { type: "SYSTEM", name: "last_name", value: lastName },
    { type: "SYSTEM", name: "email", subtype: "work", value: contact.email },
    { type: "SYSTEM", name: "phone", subtype: "mobile", value: contact.mobile },
  ];

  const customFields: [string, string][] = [
    ["City Name", contact.city],
    ["Course Interested In", contact.courseInterested],
    ["UTM Source", contact.utmSource],
    ["UTM Medium", contact.utmMedium],
    ["UTM Campaign", contact.utmCampaign],
    ["Form Filled URL", contact.landingPage],
    ["Source", contact.source],
  ];

  for (const [fieldName, value] of customFields) {
    if (value) properties.push({ type: "CUSTOM", name: fieldName, value });
  }

  const res = await fetch(`https://${domain}.agilecrm.com/dev/api/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ tags: ["DEPL"], properties }),
  });

  console.log("[Agile] response status:", res.status);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Agile CRM ${res.status}: ${text}`);
  }
  console.log("[Agile] contact pushed successfully");
}
