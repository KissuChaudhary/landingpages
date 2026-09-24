import React from 'react';
import type { Theme } from '../hooks/useTheme';

const iconBtnClass =
  'flex items-center justify-center size-9 border-none rounded-full bg-(--icon-btn-bg) text-inherit cursor-pointer no-underline transition-[background-color] duration-200 [-webkit-tap-highlight-color:transparent] hover:bg-(--icon-btn-hover) focus-visible:outline-2 focus-visible:outline-(--icon-btn-outline) focus-visible:outline-offset-2 [&_svg]:block [&_svg]:shrink-0 [&_svg]:fill-(--icon-btn-fill) [&_svg]:opacity-60 [&_svg]:transition-opacity [&_svg]:duration-200 hover:[&_svg]:opacity-100';

export function Header({
  theme: _theme,
  onToggleTheme: _onToggleTheme,
  debug,
  onToggleDebug,
  bigChips,
  onToggleBigChips,
  smallAll,
  onToggleSmallAll,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  debug: boolean;
  onToggleDebug: () => void;
  bigChips: boolean;
  onToggleBigChips: () => void;
  smallAll: boolean;
  onToggleSmallAll: () => void;
}) {
  return (
    <header className="w-full flex items-center justify-between pt-10 pb-12">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center size-12 rounded-full bg-linear-to-br from-[#2a2a2a] to-[#121212] shadow-lg border border-white/5 relative overflow-hidden before:absolute before:inset-0 before:bg-linear-to-tr before:from-transparent before:to-white/10 before:opacity-50">
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/90 relative z-10 drop-shadow-md">
             <circle cx="12" cy="12" r="10" strokeOpacity="0.8" />
             <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" strokeOpacity="0.4" />
             <path d="M2 12h20" strokeOpacity="0.4" />
             <circle cx="12" cy="12" r="3" fill="currentColor" className="text-white/20" stroke="none" />
           </svg>
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-lg font-semibold leading-tight text-(--title-color) tracking-wide">Thinking Orbs</h1>
          <p className="text-[12px] font-medium text-(--subtitle-color) opacity-50 tracking-wider mt-1 uppercase">Animated Components</p>
        </div>
      </div>
      
      <nav className="flex items-center gap-2" aria-label="Dev controls">
        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={onToggleDebug}
            aria-pressed={debug}
            className={`${iconBtnClass} font-[Roboto_Mono,monospace] text-[11px] ${debug ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'}`}
            title="Toggle hero surface fill (dev only)"
          >
            BG
          </button>
        )}
        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={onToggleBigChips}
            aria-pressed={bigChips}
            className={`${iconBtnClass} font-[Roboto_Mono,monospace] text-[11px] ${bigChips ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'}`}
            title="Render the small chips as large pills (dev only)"
          >
            LG
          </button>
        )}
        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={onToggleSmallAll}
            aria-pressed={smallAll}
            className={`${iconBtnClass} font-[Roboto_Mono,monospace] text-[11px] ${smallAll ? 'bg-(--icon-btn-hover) text-(--title-color)' : 'text-(--footer-muted)'}`}
            title="Force every pill to the small chip style (dev only)"
          >
            SM
          </button>
        )}
      </nav>
    </header>
  );
}
