import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import useAuth from '../auth/useAuth';
import apiClient from '../api/axiosConfig';
import styles from './CheckoutPage.module.css';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: user?.first_name ? `${user.first_name} ${user.last_name}` : '',
    email: user?.email || '',
    address: '',
    city: '',
    postal_code: '',
    country: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const orderData = {
      ...formData,
      items: cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      // The apiClient from your Canvas will automatically add the auth token
      await apiClient.post('/orders/', orderData);
      alert('Order placed successfully!');
      clearCart();
      navigate('/profile'); // Redirect to profile to see order history
    } catch (err) {
      console.error('Failed to place order:', err);
      setError('There was an error placing your order. Please check your details and try again.');
    }
  };

  if (cartItems.length === 0) {
    return (
        <div className={styles.emptyCart}>
            <h2>Your cart is empty.</h2>
            <p>You cannot proceed to checkout without items.</p>
        </div>
    )
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1 className={styles.title}>Checkout</h1>
      <form onSubmit={handleSubmit} className={styles.checkoutLayout}>
        <div className={styles.shippingForm}>
          <h2>Shipping Address</h2>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.inputGroup}>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label>City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required />
            </div>
            <div className={styles.inputGroup}>
              <label>Postal Code</label>
              <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} required />
            </div>
          </div>
           <div className={styles.inputGroup}>
              <label>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </div>
        </div>

        <div className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <strong>Total</strong>
            <strong>${calculateTotal()}</strong>
          </div>
          <button type="submit" className={styles.placeOrderButton}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;