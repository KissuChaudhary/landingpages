'use client';

import React, { useState } from 'react';
import { ApprovalCard } from '../registry/approval-card';

export default function ApprovalCardDemo({ tab = 'Pending' }: { tab?: string }) {
  const [expiresAt] = useState(() => Date.now() + 2 * 60 * 1000 + 41 * 1000);

  if (tab === 'Destructive') {
    return (
      <div className="w-full max-w-[420px]">
        <ApprovalCard
          title="Delete 214 files from /archive"
          description="The cleanup agent wants to permanently remove last year’s exports."
          details={[
            { label: 'Folder', value: '/archive/2025' },
            { label: 'Size', value: '3.2 GB' },
          ]}
          approveLabel="Delete files"
          denyLabel="Keep them"
          destructive
          expiresAt={expiresAt}
        />
      </div>
    );
  }

  const status = tab === 'Approved' ? 'approved' : tab === 'Denied' ? 'denied' : tab === 'Expired' ? 'expired' : undefined;

  return (
    <div className="w-full max-w-[420px]">
      <ApprovalCard
        title="Send email to 3 people"
        description="The agent drafted a follow-up to Thursday’s tasting and wants to send it from your address."
        details={[
          { label: 'To', value: 'maya@scoopco.com, +2 more' },
          { label: 'Subject', value: 'Thursday tasting menu' },
        ]}
        reason="Sending email on your behalf always needs a yes from you."
        approveLabel="Send"
        denyLabel="Don’t send"
        status={status}
      />
    </div>
  );
}
