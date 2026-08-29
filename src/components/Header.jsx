import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Phone, Menu, X, Leaf, Sparkles, Truck, ShieldCheck } from 'lucide-react';
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

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'HOME' },
    { path: '/shop', label: 'SHOP' },
    { path: '/blog', label: 'BLOG' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const getActiveIndex = () => {
    const idx = navItems.findIndex((item) => item.path === location.pathname);
    return idx;
  };

  const activeIndex = getActiveIndex();
  const hasActiveItem = activeIndex !== -1;
  const formattedTotal = cartTotal.toLocaleString('en-US');

  return (
    <>
      {/* 1. Ultra-Clean Top Announcement Strip */}
      <div className="top-announcement-strip">
        <div className="container announcement-inner">
          <div className="announcement-items-flow">
            <span className="announcement-item">
              <Leaf size={12} color="#10b981" />
              <span>১০০% প্রাকৃতিক ও নির্ভেজাল খাদ্যপণ্য</span>
            </span>
            <span className="announcement-dot">•</span>
            <span className="announcement-item">
              <Truck size={12} color="#10b981" />
              <span>সারাদেশে ক্যাশ অন ডেলিভারি (পার্সেল চেক করে পেমেন্ট)</span>
            </span>
            <span className="announcement-dot">•</span>
            <span className="announcement-item highlight-tag">
              <Sparkles size={12} color="#f59e0b" />
              <span>৳ ২,০০০+ অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
            </span>
          </div>

          <div className="announcement-hotline-quick">
            <a href="tel:01712345678" className="announcement-call-link">
              <Phone size={11} />
              <span>হেল্পলাইন: 01712-345678</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. Floating Glass Site Header */}
      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className={`container header-inner ${isScrolled ? 'inner-scrolled' : ''}`}>
          {/* Brand Logo */}
          <Link to="/" className="header-logo-group" onClick={() => setMobileNavOpen(false)}>
            <div className="logo-leaf-icon">
              <Leaf size={16} color="#ffffff" />
            </div>
            <div className="logo-text-wrapper">
              <span className="logo-brand-title">URMIRA</span>
              <span className="logo-brand-tagline">ORGANIC</span>
            </div>
          </Link>

          {/* Apple iOS Precision Segmented Navigation */}
          <nav className="header-nav-segmented" role="tablist">
            {/* Smooth Sliding Pill (bounded with 3px clearance) */}
            {hasActiveItem && (
              <div 
                className="nav-sliding-pill" 
                style={{ 
                  transform: `translateX(calc(${activeIndex} * 100%))`,
                  opacity: 1
                }}
              />
            )}

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

        {/* Mobile Dropdown Menu (Frosted Glass Sheet) */}
        {mobileNavOpen && (
          <div className="ios-mobile-menu-overlay" onClick={() => setMobileNavOpen(false)}>
            <div className="ios-mobile-menu-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-sheet-head">
                <div className="sheet-brand">
                  <div className="logo-leaf-icon" style={{ width: '28px', height: '28px' }}>
                    <Leaf size={14} color="#ffffff" />
                  </div>
                  <span style={{ fontWeight: '900', color: '#054231', fontSize: '1.1rem' }}>URMIRA</span>
                </div>
                <button 
                  className="mobile-sheet-close"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mobile-nav-links-list">
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
              </div>

              <div className="mobile-sheet-footer">
                <a 
                  href="tel:01712345678" 
                  className="mobile-sheet-hotline-btn"
                >
                  <Phone size={15} />
                  <span>কল করুন: 01712-345678</span>
                </a>
                <div className="mobile-sheet-guarantee">
                  <ShieldCheck size={13} color="#10b981" />
                  <span>১০০% খাঁটি ও নির্ভেজাল খাবার</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
