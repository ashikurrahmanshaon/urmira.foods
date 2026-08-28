import { Link } from 'react-router-dom';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Truck, Package } from 'lucide-react';
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
                <h3 className="drawer-heading-title">Shopping Bag</h3>
                <span className="drawer-count-pill">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
              </div>
              <span className="drawer-sub-bengali">Cash on Delivery Available</span>
            </div>
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close"
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
                <>Add <strong>৳ {remainingForFree.toLocaleString('en-US')}</strong> more for <strong>FREE Delivery</strong></>
              ) : (
                <strong>🎉 Free Delivery Unlocked!</strong>
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
              <h4>Your Bag is Empty</h4>
              <p>Explore our pure organic foods.</p>
              <Link 
                to="/shop" 
                className="btn btn-primary" 
                onClick={() => setIsCartDrawerOpen(false)}
                style={{ marginTop: '1.25rem' }}
              >
                <span>Explore Shop</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="drawer-item-card-ios">
                <div className="drawer-item-thumbnail">
                  <img 
                    src={item.image || '/images/khejur-1.jpg'} 
                    alt={item.name} 
                    className="drawer-item-real-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/khejur-1.jpg';
                    }}
                  />
                </div>
                
                <div className="drawer-item-details">
                  <div className="drawer-item-head">
                    <h4 className="drawer-item-title">{item.name}</h4>
                    <button 
                      className="drawer-item-delete-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="drawer-item-meta-row">
                    <span className="drawer-item-weight">{item.weight}</span>
                    <span className="drawer-item-unit-price">৳ {item.price.toLocaleString('en-US')} each</span>
                  </div>
                  
                  <div className="drawer-item-bottom-row">
                    <div className="drawer-qty-pill-ios">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease"
                      >-</button>
                      <span className="drawer-qty-num">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase"
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
                <span className="subtotal-label">Subtotal:</span>
                <strong className="drawer-subtotal-val">৳ {formattedTotal}</strong>
              </div>
              <p className="drawer-tax-note">
                <ShieldCheck size={13} color="#10b981" />
                <span>Pay on Delivery • পার্সেল চেক করে পেমেন্ট</span>
              </p>
            </div>
            
            <Link 
              to="/cart" 
              className="btn btn-primary drawer-checkout-btn"
              onClick={() => setIsCartDrawerOpen(false)}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <div className="drawer-trust-guarantee">
              <ShieldCheck size={14} color="#10b981" />
              <span>100% Authentic Quality Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
