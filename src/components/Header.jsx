import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Phone, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Header() {
  const location = useLocation();
  const { cartCount, cartTotal, setIsCartDrawerOpen } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/shop', label: 'SHOP' },
    { path: '/blog', label: 'BLOG' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const getActiveIndex = () => {
    const idx = navItems.findIndex((item) => item.path === location.pathname);
    return idx !== -1 ? idx : 0;
  };

  const activeIndex = getActiveIndex();

  const formattedTotal = cartTotal.toLocaleString('en-US');

  return (
    <>
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className={`container header-inner ${isScrolled ? 'inner-scrolled' : ''}`}>
          {/* Brand Logo */}
          <Link to="/" className="header-logo-group" onClick={() => setMobileNavOpen(false)}>
            <div className="logo-leaf-icon">
              <Leaf size={15} color="#ffffff" />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-brand-title">URMIRA</span>
              <span className="logo-brand-tagline">ORGANIC</span>
            </div>
          </Link>

          {/* Apple iOS Precision Segmented Navigation */}
          <nav className="header-nav-segmented" role="tablist">
            {/* Mathematically Centered Sliding Pill */}
            <div 
              className="nav-sliding-pill" 
              style={{ 
                transform: `translateX(calc(${activeIndex} * 100%))`
              }}
            />

            {navItems.map((item) => {
              const isCurrent = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-segment-link ${isCurrent ? 'active-segment' : ''}`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions (Iconic Hotline + Iconic Cart Capsule) */}
          <div className="header-actions-group">
            {/* Iconic Hotline Pill */}
            <a href="tel:01712345678" className="header-hotline-compact">
              <div className="hotline-icon-circle">
                <Phone size={12} className="phone-ringing-icon" />
              </div>
              <span className="hotline-number-text">01712-345678</span>
            </a>

            {/* Truly Iconic Dual-Hub Cart Capsule */}
            <button 
              className="ios-cart-capsule" 
              onClick={() => setIsCartDrawerOpen(true)}
              aria-label="Open Shopping Bag"
            >
              <div className="cart-icon-hub">
                <ShoppingBag size={14} color="#ffffff" />
                {cartCount > 0 && (
                  <span className="cart-floating-badge">{cartCount}</span>
                )}
              </div>
              <div className="cart-price-divider"></div>
              <span className="cart-capsule-price">৳ {formattedTotal}</span>
            </button>

            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle menu"
            >
              {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="ios-mobile-menu">
            {navItems.map((item) => {
              const isCurrent = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`ios-mobile-link ${isCurrent ? 'active-segment' : ''}`}
                  onClick={() => setMobileNavOpen(false)}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <a 
              href="tel:01712345678" 
              className="ios-mobile-link"
              style={{ color: '#054231', fontWeight: '800' }}
            >
              <span>হটলাইন: 01712-345678</span>
              <Phone size={14} />
            </a>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
