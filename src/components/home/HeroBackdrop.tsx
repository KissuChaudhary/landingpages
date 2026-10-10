import React from 'react';
import styles from './HeroBackdrop.module.css';

export default function HeroBackdrop() {
  return (
    <div aria-hidden="true" className={styles.backdrop}>
      <div className={styles.grain} />
    </div>
  );
}
