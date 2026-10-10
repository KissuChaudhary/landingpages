import React, { useId } from 'react';
import styles from './HeroBackdrop.module.css';

/** A folded sheet of light. Vector gradients keep its illuminated edge crisp at every screen size. */
export default function RefractedRibbon() {
  const id = useId().replace(/:/g, '');
  const paint = (name: string) => `url(#${id}-${name})`;

  return (
    <svg viewBox="0 0 1440 780" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false">
      <defs>
        <linearGradient id={`${id}-body`} x1="164" y1="616" x2="1390" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffaf95" stopOpacity="0.16" />
          <stop offset="0.2" stopColor="#ff81ba" stopOpacity="0.4" />
          <stop offset="0.44" stopColor="#a38bff" stopOpacity="0.34" />
          <stop offset="0.7" stopColor="#5572f5" stopOpacity="0.7" />
          <stop offset="0.9" stopColor="#3e60e9" stopOpacity="0.94" />
          <stop offset="1" stopColor="#91d8ff" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="1129" y1="84" x2="1357" y2="395" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c0eaff" stopOpacity="0.9" />
          <stop offset="0.28" stopColor="#668cfa" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#2447c8" stopOpacity="0.95" />
          <stop offset="0.74" stopColor="#8971f1" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e3cbff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id={`${id}-return`} x1="87" y1="436" x2="839" y2="644" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff976e" stopOpacity="0.5" />
          <stop offset="0.25" stopColor="#ffb6cb" stopOpacity="0.4" />
          <stop offset="0.55" stopColor="#a08bfa" stopOpacity="0.26" />
          <stop offset="1" stopColor="#e7ebff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="38" y1="421" x2="1387" y2="194" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffa47f" stopOpacity="0.1" />
          <stop offset="0.26" stopColor="#ffc8df" stopOpacity="0.7" />
          <stop offset="0.54" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="0.75" stopColor="#d9d7ff" />
          <stop offset="1" stopColor="#e0f6ff" />
        </linearGradient>
        <linearGradient id={`${id}-glint`} x1="1150" y1="46" x2="1400" y2="323" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0" />
          <stop offset="0.48" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-coral`} cx="0" cy="0" r="1" gradientTransform="translate(96 468) rotate(28) scale(260 92)" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff977e" stopOpacity="0.4" />
          <stop offset="1" stopColor="#ffc3c7" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-bloom`} x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
        <filter id={`${id}-halo`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <linearGradient id={`${id}-visibility`} x1="0" y1="0" x2="0" y2="780" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" />
          <stop offset="0.72" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <path fill={paint('visibility')} d="M0 0h1440v780H0z" />
        </mask>
      </defs>

      <g mask={paint('mask')}>
        <ellipse cx="1257" cy="232" rx="177" ry="198" fill="#a4b4ff" opacity="0.16" filter={paint('bloom')} />
        <ellipse cx="96" cy="468" rx="290" ry="130" fill={paint('coral')} filter={paint('bloom')} />

        <path
          d="M1465-120C1160-112 997 6 1128 132C1342 338 1490 232 1394 384C1322 500 1120 550 791 572C506 592 221 583 58 487C-102 393-71 337-162 291L-220 478C34 744 484 772 875 727C1204 690 1478 592 1556 405C1645 191 1445 213 1353 120C1275 41 1426 9 1570 35Z"
          fill={paint('body')}
        />
        <path
          d="M1465-120C1160-112 997 6 1128 132C1240 240 1334 262 1396 267C1465 273 1439 316 1394 384C1474 319 1539 250 1458 208C1409 182 1384 151 1353 120C1275 41 1426 9 1570 35Z"
          fill={paint('fold')}
        />
        <path
          d="M-162 291C-71 337-102 393 58 487C221 583 506 592 791 572C480 641 175 627 9 526C-64 482-111 410-162 291Z"
          fill={paint('return')}
        />

        <path
          d="M1465-120C1160-112 997 6 1128 132C1342 338 1490 232 1394 384C1322 500 1120 550 791 572C506 592 221 583 58 487C-102 393-71 337-162 291"
          stroke={paint('edge')} strokeWidth="7" opacity="0.5" filter={paint('halo')}
        />
        <path
          d="M1465-120C1160-112 997 6 1128 132C1342 338 1490 232 1394 384C1322 500 1120 550 791 572C506 592 221 583 58 487C-102 393-71 337-162 291"
          stroke={paint('edge')} strokeWidth="1.3"
        />
        <path
          className={styles.edgeSweep}
          d="M1465-120C1160-112 997 6 1128 132C1342 338 1490 232 1394 384C1322 500 1120 550 791 572C506 592 221 583 58 487C-102 393-71 337-162 291"
          pathLength="1000" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="100 1100"
        />
        <path d="M1150 153C1261 250 1334 266 1396 267" stroke={paint('glint')} strokeWidth="2.5" />
        <path d="M1353 120C1384 151 1409 182 1458 208" stroke="#e3efff" strokeOpacity="0.5" strokeWidth="0.8" />
      </g>
    </svg>
  );
}
