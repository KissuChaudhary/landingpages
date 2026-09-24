import type { ModeKey } from '../presets';
import type { ModeDraw } from './types';
import { drawMorph } from './morph';
import { drawOrbits } from './orbits';
import { drawRibbon } from './ribbon';
import { drawWeb } from './web';
import { drawMatrix } from './matrix';
import { drawMobius } from './mobius';
import { drawDust } from './dust';
import { drawNucleus } from './nucleus';
import { drawSonar } from './sonar';
import { drawDial } from './dial';
import { drawGuide } from './guide';

import { drawGlobe, drawRubik, drawWave } from './lattice';
import { drawBraid } from './braid';
import { drawHelix } from './helix';
import { drawPulse } from './pulse';
import { drawSwarm } from './swarm';
import { drawResolve } from './resolve';
import { drawKnot } from './knot';
import { drawGyro } from './gyro';
import { drawSpark } from './spark';
import { drawRipple } from './ripple';

export const MODE_DRAWS: Record<ModeKey, ModeDraw> = {
  orbits: drawOrbits,
  globe: drawGlobe,
  rubik: drawRubik,
  wave: drawWave,
  web: drawWeb,
  braid: drawBraid,
  ribbon: drawRibbon,
  ring: drawRibbon, // ring shares ribbon's painter
  morph: drawMorph,
  helix: drawHelix,
  pulse: drawPulse,
  swarm: drawSwarm,
  resolve: drawResolve,
  knot: drawKnot,
  gyro: drawGyro,
  spark: drawSpark,
  ripple: drawRipple,
  matrix: drawMatrix,
  mobius: drawMobius,
  dust: drawDust,
  nucleus: drawNucleus,
  sonar: drawSonar,
  dial: drawDial,
  guide: drawGuide
};
