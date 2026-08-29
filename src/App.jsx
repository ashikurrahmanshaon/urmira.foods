import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AdminOrders from './pages/AdminOrders';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import ShippingDelivery from './pages/ShippingDelivery';
import ReturnPolicy from './pages/ReturnPolicy';
import Contact from './pages/Contact';
import FloatingSupportWidget from './components/FloatingSupportWidget';

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className={`app-container ${isAdmin ? 'admin-fullscreen-layout' : ''}`}>
      {!isAdmin && <Header />}
      <main className={`main-content ${isAdmin ? 'main-admin-content' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop.html" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/product.html" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart.html" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog.html" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/shipping-delivery" element={<ShippingDelivery />} />
          <Route path="/shipping-delivery.html" element={<ShippingDelivery />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="/return-policy.html" element={<ReturnPolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact.html" element={<Contact />} />
          <Route path="/admin" element={<AdminOrders />} />
          <Route path="/admin.html" element={<AdminOrders />} />
          {/* Catch-all fallback so users never see a blank screen */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <CartDrawer />}
      {!isAdmin && <FloatingSupportWidget />}
      <Toast />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <AppLayout />
      </Router>
    </CartProvider>
  );
}

export default App;
