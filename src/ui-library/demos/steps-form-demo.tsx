'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { StepsForm, type FormStep } from '../registry/steps-form';
import { NumberRoll } from '../registry/number-roll';
import { TextMorph } from '../registry/text-morph';

const EASE = 'cubic-bezier(0.16,1,0.3,1)';
const PLANS = [
  { id: 'starter', name: 'Starter', price: 0, note: 'Just you, free' },
  { id: 'team', name: 'Team', price: 12, note: '$12 a seat' },
  { id: 'business', name: 'Business', price: 24, note: '$24 a seat, SSO' },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const slug = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'your-team';
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Plan cards with one ring that glides to the chosen card. */
function Plans({ value, onChange }: { value: string; onChange: (id: string) => void }) {
  const refs = useRef<(HTMLLabelElement | null)[]>([]);
  const [ring, setRing] = useState<{ y: number; h: number } | null>(null);
  const index = PLANS.findIndex((p) => p.id === value);
  useLayoutEffect(() => {
    const el = refs.current[index];
    if (el) setRing({ y: el.offsetTop, h: el.offsetHeight });
  }, [index]);
  return (
    <div role="radiogroup" aria-label="Plan" className="relative flex flex-col gap-1.5">
      {ring && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 rounded-[12px] border border-foreground"
          style={{ transform: `translateY(${ring.y}px)`, height: ring.h, transition: `transform 380ms ${EASE}, height 380ms ${EASE}` }}
        />
      )}
      {PLANS.map((p, i) => (
        <label
          key={p.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-border px-3 py-2.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/40"
        >
          <input type="radio" name="plan" value={p.id} checked={value === p.id} onChange={() => onChange(p.id)} className="sr-only" />
          <span
            className="flex size-4 shrink-0 items-center justify-center rounded-full border"
            style={{ borderColor: value === p.id ? 'var(--foreground)' : 'var(--border)', transition: 'border-color 200ms' }}
          >
            <span className="size-2 rounded-full bg-foreground" style={{ transform: `scale(${value === p.id ? 1 : 0})`, transition: `transform 260ms cubic-bezier(0.34,1.36,0.64,1)` }} />
          </span>
          <span className="flex-1 text-[13.5px] font-medium text-foreground">{p.name}</span>
          <span className="text-[12px] text-muted-foreground">{p.note}</span>
        </label>
      ))}
    </div>
  );
}

function Done({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center py-2 text-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="19" stroke="var(--border)" />
        <path
          d="M12.5 20.5l5 5 10-11"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          className="motion-safe:animate-[ui-draw_520ms_cubic-bezier(0.16,1,0.3,1)_120ms_both]"
        />
      </svg>
      <p className="mt-3 text-[18px] font-semibold tracking-tight text-foreground">{name.trim() || 'Your workspace'} is ready</p>
      <p className="mt-1 text-[13px] text-muted-foreground">hairline.app/{slug(name)}</p>
      <button type="button" className="mt-4 h-9 rounded-full bg-primary px-4 text-[13px] font-medium text-primary-foreground">
        Open workspace
      </button>
    </div>
  );
}

export default function StepsFormDemo() {
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('team');
  const [emails, setEmails] = useState<string[]>(['ana@kept.coffee']);
  const [draft, setDraft] = useState('');
  const chosen = PLANS.find((p) => p.id === plan)!;
  const seats = plan === 'starter' ? 1 : emails.length + 1;

  const addDraft = () => {
    const email = draft.trim().replace(/,$/, '');
    if (!email) return null;
    if (!EMAIL.test(email)) return 'That doesn’t look like an email address.';
    if (!emails.includes(email)) setEmails((e) => [...e, email]);
    setDraft('');
    return null;
  };

  const steps: FormStep[] = [
    {
      id: 'name',
      label: 'Workspace',
      title: 'Name your workspace',
      description: 'It’s the name your team sees. You can change it later.',
      content: (
        <div>
          <label htmlFor="ws-name" className="sr-only">
            Workspace name
          </label>
          <input
            id="ws-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Kept Coffee"
            autoComplete="organization"
            className="h-10 w-full rounded-[10px] border border-border bg-background px-3 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
          />
          <p className="mt-2 text-[12px] text-muted-foreground">
            hairline.app/<TextMorph className="text-foreground">{slug(name)}</TextMorph>
          </p>
        </div>
      ),
      // Checking whether the name is free takes a moment, like a real lookup.
      validate: async () => {
        if (name.trim().length < 2) return 'Give it a name, two letters or more.';
        await wait(650);
        if (slug(name) === 'hairline') return 'hairline.app/hairline is taken. Try another name.';
      },
    },
    {
      id: 'plan',
      label: 'Plan',
      title: 'Pick a plan',
      content: <Plans value={plan} onChange={setPlan} />,
    },
    {
      id: 'team',
      label: 'Team',
      title: 'Invite your team',
      description: 'Press Enter after each address. You can skip this for now.',
      content: (
        <div>
          <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-[10px] border border-border bg-background p-1.5 focus-within:border-foreground/40">
            {emails.map((e) => (
              <span
                key={e}
                ref={(el) => {
                  if (!el || el.dataset.in) return;
                  el.dataset.in = '1';
                  el.animate([{ transform: 'scale(0.7)', opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 260, easing: 'cubic-bezier(0.34,1.36,0.64,1)' });
                }}
                className="inline-flex h-7 items-center gap-1 rounded-full border border-border bg-card pl-2.5 pr-1 text-[12.5px] text-foreground"
              >
                {e}
                <button
                  type="button"
                  aria-label={`Remove ${e}`}
                  onClick={() => setEmails((all) => all.filter((x) => x !== e))}
                  className="flex size-5 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            <input
              aria-label="Add an email address"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ',') && draft.trim()) {
                  e.preventDefault();
                  addDraft();
                }
                if (e.key === 'Backspace' && !draft && emails.length) setEmails((all) => all.slice(0, -1));
              }}
              placeholder={emails.length ? 'Add another' : 'name@company.com'}
              className="h-7 min-w-[120px] flex-1 bg-transparent px-1.5 text-[13px] text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>
          <p className="mt-2 text-[12px] tabular-nums text-muted-foreground">
            <NumberRoll value={seats} /> <TextMorph>{seats === 1 ? 'seat' : 'seats'}</TextMorph> · $<NumberRoll value={seats * chosen.price} /> a month
          </p>
        </div>
      ),
      validate: () => addDraft(),
    },
    {
      id: 'review',
      label: 'Review',
      title: 'Check and create',
      content: (
        <dl className="divide-y divide-border rounded-[12px] border border-border text-[13px]">
          {[
            ['Workspace', name.trim()],
            ['Address', `hairline.app/${slug(name)}`],
            ['Plan', chosen.name],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-3 px-3 py-2.5">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="truncate text-right font-medium text-foreground">{v}</dd>
            </div>
          ))}
          <div className="flex justify-between gap-3 px-3 py-2.5">
            <dt className="text-muted-foreground">Monthly</dt>
            <dd className="font-medium tabular-nums text-foreground">
              $<NumberRoll value={seats * chosen.price} /> <span className="font-normal text-muted-foreground">for {seats}</span>
            </dd>
          </div>
        </dl>
      ),
    },
  ];

  return (
    <div className="flex h-[500px] w-full max-w-[400px] flex-col sm:h-[470px]">
      <StepsForm
        steps={steps}
        onSubmit={() => wait(1300)}
        submitLabels={{ idle: 'Create workspace', pending: 'Creating', success: 'Created' }}
        done={<Done name={name} />}
      />
      <p className="mt-3 text-center text-[12px] text-muted-foreground">Try “hairline” as the name.</p>
    </div>
  );
}
