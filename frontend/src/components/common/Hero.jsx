import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.css';
// I'll use a placeholder image for the illustration.
// You can replace 'hero-illustration.png' with an actual image in your assets folder.
import heroImage from '../../assets/images/hero-illustration.png'; 

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Welcome to <span className={styles.brandName}>MONKFROG</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Discover unique and playful cushions, lamps, and more!
        </p>
        <Link to="/" className={styles.heroButton}>Shop Now</Link>
      </div>
      <div className={styles.heroImageContainer}>
        <img src={heroImage} alt="Monkfrog Illustration" className={styles.heroImage} />
      </div>
    </div>
  );
};

export default Hero;