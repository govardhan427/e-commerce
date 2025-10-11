import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.brandSection}>
          <h3 className={styles.brandName}>MONKFROG</h3>
          <p className={styles.brandSlogan}>Playful designs, endless smiles.</p>
        </div>
        <div className={styles.linksSection}>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/login">Login</a></li>
          </ul>
        </div>
        <div className={styles.contactSection}>
          <h4>Contact Us</h4>
          <p>support@monkfrog.com</p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} MONKFROG. All Rights Reserved.</p>
        <p className={styles.signature}>Designed & Developed by [Your Name]</p>
      </div>
    </footer>
  );
};

export default Footer;