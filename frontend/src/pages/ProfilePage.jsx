import React, { useState, useEffect } from 'react';
import useAuth from '../auth/useAuth';
import apiClient from '../api/axiosConfig';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // The interceptor in axiosConfig automatically adds the auth token
        const response = await apiClient.get('/orders/');
        setOrders(response.data.results); // Assuming pagination
        setError(null);
      } catch (err) {
        setError('Failed to fetch order history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Fetch orders only once when the component mounts

  if (loading) {
    return <div className={styles.centered}>Loading profile...</div>;
  }

  if (error) {
    return <div className={`${styles.centered} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.title}>Your Profile</h1>
      <div className={styles.userInfo}>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
      </div>

      <div className={styles.orderHistory}>
        <h2 className={styles.subtitle}>Order History</h2>
        {orders.length === 0 ? (
          <p>You have not placed any orders yet.</p>
        ) : (
          <div className={styles.ordersList}>
            {orders.map(order => (
              <div key={order.id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <h3>Order #{order.order_key.substring(0, 8)}</h3>
                  <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className={styles.orderDetails}>
                    <p><strong>Total:</strong> ${parseFloat(order.total_paid).toFixed(2)}</p>
                    <p><strong>Status:</strong> <span className={styles.status}>{order.status}</span></p>
                </div>
                <div className={styles.orderItems}>
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map(item => (
                      <li key={item.id}>
                        {item.product} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;