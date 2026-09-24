import fs from 'fs/promises';

async function bundle() {
  const files = [
    'src/types.ts',
    'src/engine/types.ts',
    'src/engine/core.ts',
    'src/engine/profiles.ts',
    'src/engine/morph.ts',
    'src/engine/orbits.ts',
    'src/engine/ribbon.ts',
    'src/engine/web.ts',
    'src/engine/matrix.ts',
    'src/engine/mobius.ts',
    'src/engine/dust.ts',
    'src/engine/nucleus.ts',
    'src/engine/sonar.ts',
    'src/engine/dial.ts',
    'src/engine/guide.ts',
    'src/engine/lattice.ts',
    'src/engine/braid.ts',
    'src/engine/helix.ts',
    'src/engine/pulse.ts',
    'src/engine/swarm.ts',
    'src/engine/resolve.ts',
    'src/engine/knot.ts',
    'src/engine/gyro.ts',
    'src/engine/spark.ts',
    'src/engine/ripple.ts',
    'src/engine/registry.ts',
    'src/presets.ts',
    'src/theme.ts',
    'src/ThinkingOrb.tsx'
  ];

  let output = `import * as React from 'react';\nimport { useEffect, useRef, useState } from 'react';\n\n`;

  let body = '';
  for (const file of files) {
    let content = await fs.readFile(file, 'utf8');
    
    // Remove local imports
    content = content.replace(/import\s+(?:type\s+)?\{?\s*.*?\s*\}?\s+from\s+['"]\..*?['"];?\n?/gs, '');
    
    // Remove local exports syntax like export { Dot } from './core'
    content = content.replace(/export\s+(?:type\s+)?\{?\s*.*?\s*\}?\s+from\s+['"]\..*?['"];?\n?/gs, '');

    // Remove react imports 
    content = content.replace(/import\s+.*?from\s+['"]react['"];?\n?/gs, '');

    // Strip duplicate definitions from src/types.ts
    if (file === 'src/types.ts') {
        content = content.replace(/export type ModeDraw = [\s\S]*?=> void;/g, '');
        content = content.replace(/export interface Dot \{[\s\S]*?\}/g, '');
    }

    // Replace RefObject with React.RefObject
    content = content.replace(/RefObject/g, 'React.RefObject');
    
    body += content + '\n\n';
  }

  // Remove `export ` from internal exports
  body = body.replace(/^export\s+(const|let|var|function|type|interface)/gm, '$1');

  // Re-export the public interface
  body = body.replace(/^function ThinkingOrb/gm, 'export function ThinkingOrb');
  body = body.replace(/^interface ThinkingOrbProps/gm, 'export interface ThinkingOrbProps');
  body = body.replace(/^type OrbState/gm, 'export type OrbState');
  body = body.replace(/^type OrbSize/gm, 'export type OrbSize');
  body = body.replace(/^type OrbTheme/gm, 'export type OrbTheme');

  // Remove excessive empty lines
  body = body.replace(/\n{3,}/g, '\n\n');

  output += body;

  await fs.writeFile('demo/public/registry/thinking-orb.tsx', output);
  console.log('Done!');
}
bundle();
