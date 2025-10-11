import React, { useState } from 'react';
import useAuth from '../../auth/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import styles from './LoginPage.module.css';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter both username and password.');
      return;
    }
    
    // loginUser function now returns a success status
    const success = await loginUser(username, password);
    
    if (success) {
      toast.success('Login successful!');
      navigate('/'); 
    }
    // Error toast is handled inside loginUser now
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2 className={styles.title}>Welcome Back!</h2>
        <p className={styles.subtitle}>Sign in to your MONKFROG account</p>
        
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" className={styles.loginButton}>
          Sign In
        </button>

        <p className={styles.signupText}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;