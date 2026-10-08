import type { Example } from "./types";
export const signup: Example = {
  id: "signup",
  label: "Newsletter signup",
  file: "Signup.tsx",
  request: "Make this signup clearer, with a label and a useful confirmation.",
  summary: "A visible label. A real form state. One clearer first impression.",
  removed: ['<input placeholder="Your email" />', "<button>Join</button>"],
  added: [
    '<label htmlFor={emailId}>Your email</label>',
    '<input id={emailId} type="email" required />',
    '<button type="submit">Keep me in the loop</button>',
  ],
  output: {
    title: "A good thought, once a week.",
    description: "Notes on making things. A few ideas worth keeping.",
    action: "Keep me in the loop",
  },
  before: `export default function Signup() {
  return (
    <div style={{ padding: 32, background: "#f5f5ee" }}>
      <h2>Studio notes</h2>
      <p>Notes on making things.</p>
      <input placeholder="Your email" />
      <button>Join</button>
    </div>
  );
}`,
  after: `"use client";
import { useId, useState } from "react";

export default function Signup() {
  const [confirmed, setConfirmed] = useState(false);
  const emailId = useId();
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      setConfirmed(true);
    }} style={{ padding: 32, background: "#f5f5ee", color: "#202520" }}>
      <h2>A good thought, once a week.</h2>
      <p>Notes on making things. A few ideas worth keeping.</p>
      <label htmlFor={emailId}>Your email</label>
      <input id={emailId} type="email" required />
      <button type="submit">Keep me in the loop</button>
      {confirmed && <p role="status">Example confirmed. Nothing sent.</p>}
    </form>
  );
}`,
};
