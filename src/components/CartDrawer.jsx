import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

function CartDrawer() {
  const { 
    isCartDrawerOpen, 
    setIsCartDrawerOpen, 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartTotal,
    cartCount
  } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 2000;
  const progressPercent = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const remainingForFree = freeShippingThreshold - cartTotal;
  const formattedTotal = cartTotal.toLocaleString('en-US');

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartDrawerOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="drawer-head-icon">
              <ShoppingBag size={17} color="#ffffff" />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <h3 className="drawer-heading-title">শপিং ব্যাগ</h3>
                <span className="drawer-count-pill">{cartCount} টি পণ্য</span>
              </div>
              <span className="drawer-sub-bengali">ক্যাশ অন ডেলিভারি সুবিধা</span>
            </div>
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close Shopping Bag"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="drawer-shipping-progress">
          <div className="progress-text-row">
            <Truck size={14} color="#10b981" />
            <span>
              {remainingForFree > 0 ? (
                <>আর মাত্র <strong>৳ {remainingForFree.toLocaleString('en-US')}</strong> যোগ করলেই <strong>ফ্রি ডেলিভারি!</strong></>
              ) : (
                <strong>🎉 অভিনন্দন! ফ্রি ডেলিভারি আনলক হয়েছে!</strong>
              )}
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {/* Items List */}
        <div className="drawer-items-scroll">
          {cartItems.length === 0 ? (
            <div className="drawer-empty-state">
              <div className="empty-bag-circle">
                <ShoppingBag size={36} color="#054231" />
              </div>
              <h4>আপনার শপিং ব্যাগ খালি</h4>
              <p>আমাদের ১০০% খাঁটি ও নির্ভেজাল খাবারগুলো ঘুরে দেখুন।</p>
              <Link 
                to="/shop" 
                className="btn btn-primary" 
                onClick={() => setIsCartDrawerOpen(false)}
                style={{ marginTop: '1.25rem' }}
              >
                <span>প্রোডাক্ট দেখুন</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="drawer-item-card-ios">
                <div className="drawer-item-thumbnail">
                  <img 
                    src={item.image || (item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg')} 
                    alt={item.name} 
                    className="drawer-item-real-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                    }}
                  />
                </div>
                
                <div className="drawer-item-details">
                  <div className="drawer-item-head">
                    <h4 className="drawer-item-title">{item.name}</h4>
                    <button 
                      className="drawer-item-delete-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Delete item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="drawer-item-meta-row">
                    <span className="drawer-item-weight">{item.weight || '৫০০ গ্রাম'}</span>
                    <span className="drawer-item-unit-price">৳ {item.price.toLocaleString('en-US')} / পিস</span>
                  </div>
                  
                  <div className="drawer-item-bottom-row">
                    <div className="drawer-qty-pill-ios">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >-</button>
                      <span className="drawer-qty-num">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <strong className="drawer-item-total-price">
                      ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                    </strong>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Actions */}
        {cartItems.length > 0 && (
          <div className="drawer-foot">
            <div className="drawer-subtotal-card">
              <div className="drawer-subtotal-row">
                <span className="subtotal-label">সর্বমোট পণ্যের মূল্য:</span>
                <strong className="drawer-subtotal-val">৳ {formattedTotal}</strong>
              </div>
              <p className="drawer-tax-note">
                <ShieldCheck size={13} color="#10b981" />
                <span>ক্যাশ অন ডেলিভারি • পার্সেল চেক করে পেমেন্ট</span>
              </p>
            </div>
            
            <Link 
              to="/cart" 
              className="btn btn-primary drawer-checkout-btn"
              onClick={() => setIsCartDrawerOpen(false)}
            >
              <span>অর্ডার করতে এগিয়ে যান</span>
              <ArrowRight size={16} />
            </Link>

            <div className="drawer-trust-guarantee">
              <ShieldCheck size={14} color="#10b981" />
              <span>১০০% খাঁটি ও বিশুদ্ধতার নিশ্চয়তা</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
