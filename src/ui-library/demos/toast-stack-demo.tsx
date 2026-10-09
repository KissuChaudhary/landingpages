'use client';

import React from 'react';
import { Toaster, toast } from '../registry/toast-stack';

const BUTTON =
  'inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium text-foreground shadow-[inset_0_0_0_1px_var(--border)] transition-colors hover:bg-accent active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40';

const wait = (ms: number, fail = false) => new Promise((resolve, reject) => window.setTimeout(fail ? reject : resolve, ms));

export default function ToastStackDemo() {
  return (
    <div className="flex max-w-[460px] flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          className={`${BUTTON} bg-primary text-primary-foreground shadow-none hover:bg-primary/90`}
          onClick={() => toast.promise(wait(1600), { loading: 'Saving changes', success: 'Changes saved', error: 'Couldn’t save', description: 'Opening hours for Harbour Road' })}
        >
          Save changes
        </button>
        <button
          type="button"
          className={BUTTON}
          onClick={() => toast('Order #2041 archived', { description: 'It’s out of the queue but kept in history.', action: { label: 'Undo', onClick: () => toast.success('Order restored') } })}
        >
          Archive order
        </button>
        <button type="button" className={BUTTON} onClick={() => toast.promise(wait(1200, true), { loading: 'Sending the invoice', success: 'Invoice sent', error: 'The invoice didn’t send' })}>
          Send invoice
        </button>
        <button type="button" className={BUTTON} onClick={() => toast.info('Ana joined the Harbour Road shop')}>
          Teammate joined
        </button>
      </div>
      <p className="text-center text-[12.5px] text-muted-foreground">Toasts stack in the corner. Hover them to fan out, swipe one away, or press Alt+T to reach them.</p>
      <Toaster position="bottom-right" />
    </div>
  );
}
