import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

// Import Page Components
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';

// Import Common Components
import Navbar from './components/common/Navbar';
import MiniCart from './components/common/MiniCart';
import Footer from './components/common/Footer';
import ScrollToTopButton from './components/common/ScrollToTopButton'; // 1. Import the new component
import AnimatedPage from './components/common/AnimatedPage';
import ProtectedRoute from './auth/ProtectedRoute.jsx';

function App() {
  const location = useLocation();

  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          success: { style: { background: '#4CAF50', color: 'white' }},
          error: { style: { background: '#EF4444', color: 'white' }},
        }}
      />
      <Navbar />
      <MiniCart />
      <main className="container" style={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<AnimatedPage><HomePage /></AnimatedPage>} />
            <Route path="/login" element={<AnimatedPage><LoginPage /></AnimatedPage>} />
            <Route path="/register" element={<AnimatedPage><RegisterPage /></AnimatedPage>} />
            <Route path="/product/:id" element={<AnimatedPage><ProductDetailPage /></AnimatedPage>} />
            <Route path="/cart" element={<AnimatedPage><CartPage /></AnimatedPage>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/checkout" element={<AnimatedPage><CheckoutPage /></AnimatedPage>} />
              <Route path="/profile" element={<AnimatedPage><ProfilePage /></AnimatedPage>} />
            </Route>
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <ScrollToTopButton /> {/* 2. Add the component here */}
    </div>
  );
}

export default App;