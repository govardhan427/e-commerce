import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../auth/authAPI';
import styles from './RegisterPage.module.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    if (formData.password !== formData.password2) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await registerUser(formData);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      // Basic error handling - shows the first error from the backend response
      const errorData = err.response?.data;
      if (errorData) {
        const firstErrorKey = Object.keys(errorData)[0];
        const errorMessage = errorData[firstErrorKey][0];
        setError(`${firstErrorKey}: ${errorMessage}`);
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm}>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Join us and start shopping</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} required />
            </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password2">Confirm Password</label>
          <input type="password" name="password2" onChange={handleChange} required />
        </div>

        <button type="submit" className={styles.registerButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;