import type { UiItem } from '../registry';

export const codeInput: UiItem = {
  name: 'code-input',
  title: 'Code input',
  description: 'The six boxes, done properly: digits rise in, a paste cascades, a wrong code shakes and clears, the right one becomes a pill with a check.',
  summary:
    'One-time codes are the last step before someone gets in, and most code inputs are six boxes that blink. Here each digit rises into its box out of a blur and the box you’re on carries a blinking caret; delete and the digit lifts away. Paste a code, or let the phone autofill it, and it drops in one box after another. With every box full the row carries a sweep of light while you check it. A wrong code shakes, turns the boxes red, says so, and clears from the right so you can type again. The right one closes the gaps between the boxes until they’re one pill and a check draws itself at its end. Underneath, "Resend in 0:28" rolls its seconds down and becomes a Resend button that spins, ticks and starts the clock again.',
  file: 'code-input.tsx',
  dependencies: [],
  registryDependencies: ['number-roll', 'status-button', 'text-morph'],
  css: ['@keyframes ui-blink', '@keyframes ui-sheen'],
  tabs: ['Try it', 'Autofill', 'Wrong code'],
  states: [
    { name: 'typing', description: 'Each character rises 45% out of a 4px blur (300ms); a deleted one lifts away (200ms). The active box has a 1.5px ring and a blinking caret.' },
    { name: 'paste', description: 'Several characters arriving at once (paste, one-time-code autofill, or a value set from outside) cascade in 45ms apart.' },
    { name: 'checking', description: 'Once full, onComplete runs and the row carries a 1.4s sweep of light; the input is read-only.' },
    { name: 'wrong', description: 'The row shakes (±5px, 380ms), the boxes ring red and the label morphs to "That code didn’t work"; after 650ms the characters lift away right to left (30ms apart) and focus returns to the first box.' },
    { name: 'right', description: 'The gaps close (500ms), the boxes lose their own rings and the row becomes one pill with an emerald ring, a check draws itself at its end and the label morphs to "Verified".' },
    { name: 'resend', description: 'With onResend, "Resend in 0:28" counts down (seconds roll down), then crossfades to a Resend button (Status button): Sending, Sent, and the clock starts again.' },
  ],
  usage: `import { CodeInput } from "@/components/code-input";

<CodeInput
  groups={[3, 3]}
  onComplete={(code) => verify(code)} // resolve true to accept, false or throw to reject
  onResend={() => sendCode()}
/>`,
  recipeTitle: 'With a sign-in API',
  recipeIntro: 'Verify on complete; whatever your API returns decides right or wrong, and the component handles every state in between.',
  recipe: `"use client";
import { useRouter } from "next/navigation";
import { CodeInput } from "@/components/code-input";

export function VerifyStep({ phone }: { phone: string }) {
  const router = useRouter();
  return (
    <CodeInput
      autoFocus
      groups={[3, 3]}
      onComplete={async (code) => {
        const res = await fetch("/api/auth/verify", { method: "POST", body: JSON.stringify({ phone, code }) });
        if (!res.ok) return false;
        setTimeout(() => router.push("/app"), 900); // let "Verified" land first
        return true;
      }}
      onResend={() => fetch("/api/auth/send", { method: "POST", body: JSON.stringify({ phone }) })}
    />
  );
}`,
  props: [
    { name: 'onComplete', type: '(code) => Promise<boolean | void> | boolean | void', description: 'Runs when every box is filled. Resolve or return true to accept; throw or return false to reject.' },
    { name: 'onResend', type: '() => Promise | void', description: 'Shows the resend line; the countdown starts on mount and after each resend.' },
    { name: 'resendAfter', type: 'number', default: '30', description: 'Seconds before a code can be resent.' },
    { name: 'length', type: 'number', default: '6', description: 'How many boxes.' },
    { name: 'groups', type: 'number[]', description: 'Split the boxes, e.g. [3, 3] puts a dash between two threes.' },
    { name: 'value / defaultValue / onValueChange', type: 'string', description: 'Controlled or not; a full value set from outside is checked too.' },
    { name: 'alphanumeric', type: 'boolean', default: 'false', description: 'Letters as well as digits (shown upper case).' },
    { name: 'label', type: 'string', default: '"Enter the 6-digit code"', description: 'The field’s label; it morphs through the states.' },
    { name: 'autoFocus', type: 'boolean', description: 'Focus the first box on mount.' },
  ],
  notes: [
    'One real input with autocomplete="one-time-code" and the numeric keyboard sits over the boxes, so SMS autofill, paste, and screen readers see a normal text field with a label.',
    'The caret is always at the end; the boxes only show where you are.',
    'A polite status region announces "Checking the code", "That code didn’t work. Enter it again." and "Code verified"; the red ring always comes with that message.',
    'The countdown’s digits are hidden from assistive tech while ticking; the button announces itself when it’s ready.',
    'Installs Number roll, Status button and Text morph. With reduced motion nothing rises, shakes or sweeps; the states change in place.',
  ],
};
