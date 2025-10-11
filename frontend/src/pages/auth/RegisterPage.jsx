import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../auth/authAPI';
import styles from './RegisterPage.module.css';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password2: '',
  });
  
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.password !== formData.password2) {
      newErrors.password2 = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error for the field being edited
    if (errors[e.target.name]) {
        setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await registerUser(formData);
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      const errorData = err.response?.data;
      if (errorData) {
        const backendErrors = {};
        for (const key in errorData) {
          backendErrors[key] = errorData[key][0];
        }
        setErrors(backendErrors);
      } else {
        toast.error('Registration failed. Please try again.');
      }
      console.error(err);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form onSubmit={handleSubmit} className={styles.registerForm} noValidate>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Join MONKFROG and start shopping</p>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            name="username" 
            onChange={handleChange} 
            className={errors.username ? styles.inputError : ''}
            required 
          />
          {errors.username && <p className={styles.errorText}>{errors.username}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange} 
            className={errors.email ? styles.inputError : ''}
            required 
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
        </div>
        <div className={styles.nameGroup}>
            <div className={styles.inputGroup}>
                <label htmlFor="first_name">First Name</label>
                <input type="text" name="first_name" onChange={handleChange} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="last_name">Last Name</label>
                <input type="text" name="last_name" onChange={handleChange} />
            </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            className={errors.password ? styles.inputError : ''}
            required 
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password2">Confirm Password</label>
          <input 
            type="password" 
            name="password2" 
            onChange={handleChange} 
            className={errors.password2 ? styles.inputError : ''}
            required 
          />
          {errors.password2 && <p className={styles.errorText}>{errors.password2}</p>}
        </div>

        <button type="submit" className={styles.registerButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;