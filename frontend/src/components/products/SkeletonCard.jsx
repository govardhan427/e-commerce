import React from 'react';
import styles from './SkeletonCard.module.css';

const SkeletonCard = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
      <div className={styles.cardContent}>
        <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonText} ${styles.short}`}></div>
        <div className={`${styles.skeleton} ${styles.skeletonButton}`}></div>
      </div>
    </div>
  );
};

export default SkeletonCard;