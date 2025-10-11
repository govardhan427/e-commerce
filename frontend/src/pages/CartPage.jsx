import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartPage.module.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link to="/" className={styles.continueShopping}>Continue Shopping</Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image_url || 'https://placehold.co/150x150'} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemDetails}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <p className={styles.itemPrice}>₹{parseFloat(item.price).toFixed(2)}</p>
                </div>
                <div className={styles.itemActions}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                    className={styles.quantityInput}
                  />
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeButton}>
                    Remove
                  </button>
                </div>
                <p className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className={styles.cartSummary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Total</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <Link to="/checkout" className={styles.checkoutButton}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;