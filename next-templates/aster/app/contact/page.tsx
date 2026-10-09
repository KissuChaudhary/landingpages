import { SectionHead, Art } from "@/components/ui/Primitives";
import { ContactForm } from "@/components/pages/ContactForm";
export const metadata = { title: "Let's talk" };
export default function ContactPage() {
  return (
    <main id="main" className="container contact-page">
      <div className="contact-intro">
        <SectionHead
          label="A new conversation"
          lines={["Tell us about", "your creative practice."]}
          text="A question, a team or an idea. A little context is a good place to start."
          primary
        />
        <div className="contact-art">
          <Art name="petal" />
        </div>
      </div>
      <ContactForm />
    </main>
  );
}
