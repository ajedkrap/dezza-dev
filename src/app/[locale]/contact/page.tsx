import type { Metadata } from "next";
import ContactPage from "@/components/templates/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Dezza Rizqi — open to new opportunities, collaborations, and project inquiries.",
  openGraph: {
    title: "Contact | Dezza Rizqi",
    description:
      "Open to new opportunities, collaborations, and project inquiries.",
  },
};

const Contact = () => {
  return <ContactPage />;
};

export default Contact;
