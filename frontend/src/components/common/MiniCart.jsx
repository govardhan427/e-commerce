import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './MiniCart.module.css';

const MiniCart = () => {
  // We will add isCartOpen and closeCart to the context in the next step
  const { cartItems, isCartOpen, closeCart, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={closeCart}></div>
      <div className={styles.miniCart}>
        <div className={styles.header}>
          <h2>Shopping Cart</h2>
          <button onClick={closeCart} className={styles.closeButton}>&times;</button>
        </div>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image_url || 'https://placehold.co/100x100'} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemPrice}>
                      {item.quantity} x ₹{parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className={styles.removeItemButton}>&times;</button>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <div className={styles.subtotal}>
                <span>Subtotal</span>
                <span>₹{calculateSubtotal()}</span>
              </div>
              <Link to="/cart" onClick={closeCart} className={styles.viewCartButton}>
                View Cart
              </Link>
              <Link to="/checkout" onClick={closeCart} className={styles.checkoutButton}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MiniCart;