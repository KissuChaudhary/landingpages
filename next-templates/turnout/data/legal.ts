// Placeholder policies. Replace them with text written for your business and reviewed
// by someone qualified before you launch.

export type LegalPage = { title: string; updated: string; intro: string; sections: { heading: string; body: string }[] };

export const privacy: LegalPage = {
  title: "Privacy policy",
  updated: "2026-10-01",
  intro: "This placeholder explains the kind of information a studio site like this one usually handles. Replace it with your own policy before launch.",
  sections: [
    { heading: "What we collect", body: "When you send an enquiry or subscribe to the newsletter, we receive the details you enter: your name, email address, company and anything you write in the message. We don't ask for more than we need to reply." },
    { heading: "How we use it", body: "We use your details to answer your enquiry, plan your project and, if you subscribed, send the newsletter. We don't sell your information or share it with anyone except the services that help us run the studio." },
    { heading: "Events and photography", body: "Guests at events we produce may be photographed or filmed. Each event explains how content is used, and you can ask our team on the night not to be included." },
    { heading: "Your choices", body: "You can unsubscribe from the newsletter at any time using the link in each email, and you can ask us to see, correct or delete the information we hold about you by emailing the studio." },
    { heading: "Contact", body: "Questions about this policy can be sent to the studio email address listed in the footer." },
  ],
};

export const terms: LegalPage = {
  title: "Terms of use",
  updated: "2026-10-01",
  intro: "These placeholder terms describe how a studio website is usually used. Replace them with terms written for your business before launch.",
  sections: [
    { heading: "Using this site", body: "You're welcome to browse this site, read the journal and get in touch about a project. Please don't copy the site's content or imagery for commercial use without permission." },
    { heading: "Projects and quotes", body: "Prices on this site describe our studio retainers. Every project is confirmed in a written agreement that sets out the scope, production budget, timeline and usage rights. That agreement takes precedence over anything on this site." },
    { heading: "Case studies", body: "Case studies describe past work with the permission of our clients. Results are specific to each project and aren't a promise of future results." },
    { heading: "Links", body: "This site links to other services, such as booking and social platforms. We're not responsible for their content or how they handle your information." },
    { heading: "Changes", body: "We may update these terms from time to time. The date at the top of the page shows when they last changed." },
  ],
};
