'use client';

import React from 'react';
import { Citation } from '../registry/citation';

const SOURCES = [
  {
    title: 'CSS Custom Highlight API',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API',
    snippet: 'Style any range of text by registering Range objects as a named highlight, without adding elements to the page.',
  },
  {
    title: 'CSS Custom Highlight API: browser support',
    url: 'https://caniuse.com/mdn-api_highlight',
    snippet: 'Support tables for the Highlight interface across desktop and mobile browsers.',
  },
  {
    title: 'Building a selection toolbar',
    url: 'https://example.com/selection-toolbars',
  },
];

export default function CitationDemo() {
  return (
    <p className="max-w-[460px] text-[14px] leading-7 text-foreground">
      The Custom Highlight API styles a range of text without changing the DOM
      <Citation index={1} source={SOURCES[0]} />, and it now ships in Chrome, Safari and Firefox
      <Citation index={2} source={SOURCES[1]} />. Paired with the Selection API it keeps text marked while you type
      in a toolbar
      <Citation index={3} source={SOURCES[2]} status="unavailable" />.
    </p>
  );
}
