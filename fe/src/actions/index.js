export const fetchKeys = () => {
  const keys = [
    { key: "layouts.email.contact_html", value: "This is my contact info...", entity: "email_assets" },
    { key: "layouts.email.invoice_html", value: "This is my invoice info...", entity: "email_assets" },
    { key: "layouts.email.other_thing", value: "Beep boop zip zorp...", entity: "email_assets" }
  ];

  return {
    type: "FETCH_KEYS",
    payload: keys
  };
};
