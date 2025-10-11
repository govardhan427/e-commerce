import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import ProductCard from '../components/products/ProductCard';
import styles from './HomePage.module.css';
import Hero from '../components/common/Hero.jsx';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/products/');
        // FIX: Check if the response data has a 'results' property (for pagination)
        // If it does, use that array. Otherwise, assume the data itself is the array.
        const productData = Array.isArray(response.data.results) ? response.data.results : response.data;
        if (Array.isArray(productData)) {
            setProducts(productData);
        } else {
            // Handle cases where the response is not as expected
            console.error("API response is not an array:", response.data);
            setProducts([]); // Set to empty array to prevent map error
        }

        setError(null);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className={styles.centered}>Loading products...</div>;
  }

  if (error) {
    return <div className={`${styles.centered} ${styles.error}`}>{error}</div>;
  }

  return (
    <div className={styles.homePage}>
      <Hero />
      <h1 className={styles.title}>Our Products</h1>
      <div className={styles.productGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;