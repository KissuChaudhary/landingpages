// Placeholder policies. Replace them with text written for your product and reviewed by
// someone qualified before you launch, especially if you take payments.

export type LegalPage = { title: string; updated: string; intro: string; sections: { heading: string; body: string }[] };

export const privacy: LegalPage = {
  title: "Privacy policy",
  updated: "2026-10-01",
  intro: "This placeholder explains the kind of information a page-and-payments product like this one usually handles. Replace it with your own policy before launch.",
  sections: [
    { heading: "What we collect", body: "When you make a page we keep your account details, the tiles you add and the files you upload. When someone pays you, our payment partner processes their card details; we receive the amount, the item and the email address for the receipt." },
    { heading: "Visitors to your page", body: "We count views, clicks and sales for each tile without cookies or fingerprinting. We don't build profiles of visitors, and we don't share visit data with advertisers." },
    { heading: "How we use it", body: "We use your information to run your page, pay you out, send receipts and keep the service safe. We don't sell personal information." },
    { heading: "Payments and identity checks", body: "To pay out money, financial regulations require us and our partners to verify who you are. Those checks are handled by licensed providers and kept only as long as the law requires." },
    { heading: "Your choices", body: "You can export your page, files, sales history and subscriber list, correct your details or delete your account at any time from your settings." },
    { heading: "Contact", body: "Questions about this policy can be sent to the email address listed in the footer." },
  ],
};

export const terms: LegalPage = {
  title: "Terms of use",
  updated: "2026-10-01",
  intro: "These placeholder terms describe how a product like this one is usually used. Replace them with terms written for your business before launch.",
  sections: [
    { heading: "Your page", body: "You own what you put on your page. You give us permission to host and display it so your page works, and you promise you have the right to share it." },
    { heading: "Selling and getting paid", body: "When you sell through your page you're the seller, and you're responsible for what you sell, your prices, refunds and taxes. Fees are shown on the pricing page and before every payout." },
    { heading: "Fair use", body: "Don't use pages for anything illegal, deceptive or harmful, and don't try to break the service. We may suspend pages that do." },
    { heading: "Plans", body: "Paid plans renew until you cancel. You can cancel at any time and keep your plan until the end of the period you've paid for." },
    { heading: "Changes", body: "We may update these terms from time to time. The date at the top of the page shows when they last changed." },
  ],
};

export const formatDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
