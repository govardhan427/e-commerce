import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import { useCart } from '../../context/CartContext';
import styles from './Navbar.module.css';

// Simple hamburger icon component
const HamburgerIcon = () => (
  <svg className={styles.hamburgerIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const { cartItems, openCart } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const navLinkClass = ({ isActive }) => isActive ? `${styles.navLink} ${styles.activeLink}` : styles.navLink;

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logoWrapper}>
          <Link to="/" className={styles.logo}>
            {/* Split MONKFROG into two spans for separate animations */}
            <span className={styles.monk}>Monk</span><span className={styles.frog}>Frog</span>
          </Link>
          <span className={styles.subtext}>e-commerce</span>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <div className={styles.cartContainer} onClick={openCart}>
             <div className={`${styles.navLink} ${styles.cartLink}`}>
                Cart
                {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
              </div>
          </div>
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
              <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass}>Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className={styles.mobileMenuButton} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <HamburgerIcon />
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <NavLink to="/" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
          <div className={styles.cartContainer} onClick={() => { openCart(); setIsMobileMenuOpen(false); }}>
            <div className={`${styles.navLink} ${styles.cartLink}`}>
                Cart
                {cartItemCount > 0 && <span className={styles.cartBadge}>{cartItemCount}</span>}
            </div>
          </div>
          {user ? (
            <>
              <NavLink to="/profile" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Profile</NavLink>
              <button onClick={handleLogout} className={`${styles.logoutButton} ${styles.mobileLogout}`}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Login</NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;