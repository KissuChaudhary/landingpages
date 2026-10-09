import React from 'react';
import SiteHeader from '@/components/site/SiteHeader';
import { searchEntries } from '@/components/site/nav-data';

/** The site's header. Search covers every page, component and template; the list is built here on the server. */
export default function Navbar() {
  return <SiteHeader search={searchEntries()} />;
}
