import React, { useState } from 'react';
import { Header } from './components/Header';
import { Showcase } from './components/Showcase';
import { useTheme } from './hooks/useTheme';

export function App() {
  const [theme, toggleTheme] = useTheme();
  
  // Dev-only tools for debugging
  const [debug, setDebug] = useState(false);
  const [bigChips, setBigChips] = useState(false);
  const [smallAll, setSmallAll] = useState(false);

  return (
    <main className="flex flex-col items-center max-w-[1200px] mx-auto w-full px-6 pb-24 max-sm:px-4 max-sm:pb-16 min-h-screen">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        debug={debug}
        onToggleDebug={() => setDebug((d) => !d)}
        bigChips={bigChips}
        onToggleBigChips={() => setBigChips((b) => !b)}
        smallAll={smallAll}
        onToggleSmallAll={() => setSmallAll((s) => !s)}
      />
      <Showcase />
    </main>
  );
}
