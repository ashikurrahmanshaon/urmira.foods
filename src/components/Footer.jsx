import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, CheckCircle2, ShieldCheck, Leaf } from 'lucide-react';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-ios-card">
        <div className="footer-four-col-grid">
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Leaf size={16} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.03em' }}>URMIRA</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '280px' }}>
              100% pure, natural and handcrafted organic food products. Uncompromising quality and trust.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="footer-col-head">Products</h4>
            <div className="footer-col-links">
              <Link to="/product/1">Pure Gawa Ghee</Link>
              <Link to="/product/2">Khurjur Power Bomb</Link>
              <Link to="/shop">Mega Duo Combo</Link>
              <Link to="/shop">All Products</Link>
            </div>
          </div>

          {/* Col 3: Customer Support */}
          <div>
            <h4 className="footer-col-head">Customer Support</h4>
            <div className="footer-col-links">
              <Link to="/shipping-delivery">Shipping & Delivery</Link>
              <Link to="/return-policy">Return & Refund Policy</Link>
              <Link to="/contact">Contact & Helpline</Link>
              <Link to="/blog">Health & Nutrition Blog</Link>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="footer-col-head">Get Offers & Updates</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.84rem', marginBottom: '0.85rem' }}>
              Subscribe for exclusive discounts and healthy lifestyle tips.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex' }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: 1, background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '9999px 0 0 9999px', padding: '0.6rem 1rem', color: '#ffffff', fontSize: '0.84rem', outline: 'none' }}
              />
              <button type="submit" aria-label="Subscribe" style={{ background: '#d97706', color: '#ffffff', border: 'none', borderRadius: '0 9999px 9999px 0', padding: '0 1rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <Send size={14} />
              </button>
            </form>
            {subscribed && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                <CheckCircle2 size={13} /> Successfully subscribed!
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} <strong style={{ color: '#ffffff' }}>URMIRA.COM</strong>. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>100% Authentic & Natural Quality Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
