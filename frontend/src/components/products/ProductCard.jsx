import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'; // Import the useCart hook
import styles from './ProductCard.module.css';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart(); // Get the addToCart function from the context

  // A placeholder image if the product doesn't have one
  const imageUrl = product.image_url || 'https://placehold.co/600x400?text=No+Image';

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`); // Simple feedback for the user
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageContainer}>
        <img src={imageUrl} alt={product.name} className={styles.productImage} />
      </Link>
      <div className={styles.cardContent}>
        <h3 className={styles.productName}>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className={styles.productPrice}>₹{parseFloat(product.price).toFixed(2)}</p>
        {/* Attach the handler to the button's onClick event */}
        <button onClick={handleAddToCart} className={styles.addToCartButton}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

