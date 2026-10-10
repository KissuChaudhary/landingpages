import React from 'react';
import RefractedRibbon from './RefractedRibbon';
import styles from './HeroBackdrop.module.css';

export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <div className={styles.atmosphere} />
      <div className={styles.ribbon}>
        <RefractedRibbon />
      </div>
      <div className={styles.fade} />
    </div>
  );
}
