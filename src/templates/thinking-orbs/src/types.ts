export type OrbSize = 64 | 20;

export type OrbTheme = 'auto' | 'dark' | 'light';

export type OrbState =
  | 'working'
  | 'searching'
  | 'solving'
  | 'listening'
  | 'connecting'
  | 'weaving'
  | 'composing'
  | 'breathing'
  | 'shaping'
  | 'synthesizing'
  | 'transmitting'
  | 'gathering'
  | 'resolving'
  | 'reasoning'
  | 'aligning'
  | 'sparking'
  | 'resonating'
  | 'indexing'
  | 'folding'
  | 'drifting'
  | 'focusing'
  | 'syncing'
  | 'processing'
  | 'assisting';

export interface ThinkingOrbProps {
  state?: OrbState;
  size?: OrbSize;
  theme?: OrbTheme;
  speed?: number;
  paused?: boolean;
  style?: React.CSSProperties;
  'aria-label'?: string;
}

export type ModeDraw = (
  ctx: CanvasRenderingContext2D,
  size: number,
  t: number,
  dark: boolean,
  opts: any
) => void;

export interface Dot {
  x: number;
  y: number;
  z: number;
  r: number;
  white: number;
  a: number;
  color?: string; // Optional if you need custom color
}
