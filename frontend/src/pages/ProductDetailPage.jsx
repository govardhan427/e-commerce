import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../api/axiosConfig';
import { useCart } from '../context/CartContext'; // Import the useCart hook
import styles from './ProductDetailPage.module.css';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // State for the quantity input
  const { addToCart } = useCart(); // Get the addToCart function

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/products/${id}/`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // Ensure quantity is a positive number
      const numQuantity = parseInt(quantity, 10);
      if (numQuantity > 0) {
        addToCart(product, numQuantity);
        toast.success(`${numQuantity} x ${product.name} added to cart!`);
      } else {
        toast.error("Please enter a valid quantity.");
      }
    }
  };

  if (loading) {
    return <div className={styles.centered}>Loading...</div>;
  }

  if (error) {
    return <div className={`${styles.centered} ${styles.error}`}>{error}</div>;
  }

  if (!product) {
    return <div className={styles.centered}>Product not found.</div>;
  }

  const imageUrl = product.image_url || 'https://placehold.co/1200x800?text=No+Image';

  return (
    <div className={styles.pageContainer}>
      <div className={styles.productDetail}>
        <div className={styles.imageColumn}>
          <img src={imageUrl} alt={product.name} className={styles.productImage} />
        </div>
        <div className={styles.detailsColumn}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productPrice}>₹{parseFloat(product.price).toFixed(2)}</p>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.actions}>
            <input 
              type="number" 
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1" 
              className={styles.quantityInput} 
            />
            <button onClick={handleAddToCart} className={styles.addToCartButton}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Customer Reviews ({product.review_count})</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className={styles.reviewList}>
            {product.reviews.map(review => (
              <div key={review.id} className={styles.review}>
                <p className={styles.reviewAuthor}><strong>{review.user}</strong></p>
                <p className={styles.reviewRating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
                <p className={styles.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;