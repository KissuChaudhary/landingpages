import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DocsSidebar from '@/components/ui-site/DocsSidebar';
import DocsMobileBar from '@/components/ui-site/DocsMobileBar';
import { navComponents } from '@/components/site/nav-data';

/** The component docs: the sidebar stays put (scroll position, filter and all) while you move between components. */
export default function UiLayout({ children }: { children: React.ReactNode }) {
  const components = navComponents();
  return (
    <div className="min-h-screen bg-white text-[#666666] selection:bg-primary/10 selection:text-primary">
      <Navbar />
      <DocsMobileBar components={components} />
      <div className="mx-auto flex w-full max-w-[1440px]">
        <aside aria-label="Components" className="sticky top-14 hidden h-[calc(100dvh-3.5rem)] w-[264px] shrink-0 border-r border-black/[0.06] lg:block">
          <DocsSidebar components={components} />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
