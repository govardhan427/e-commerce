import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../auth/useAuth';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link to="/">E-Shop</Link>
        </div>
        <div className={styles.navLinks}>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;