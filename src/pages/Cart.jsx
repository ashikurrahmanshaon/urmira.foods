import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, Check, ArrowLeft, ShieldCheck, Truck, CheckCircle2, Package, ArrowRight, Lock, Printer, FileText, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../utils/orderStorage';
import InvoiceModal from '../components/InvoiceModal';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  const [deliveryZone, setDeliveryZone] = useState('inside'); // inside: 70, outside: 130
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const shippingCost = deliveryZone === 'inside' ? 70 : 130;
  const grandTotal = cartTotal + shippingCost;

  // Scroll to top when order is placed so customer never sees the footer
  useEffect(() => {
    if (orderPlaced) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [orderPlaced]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা পূরণ করুন।');
      return;
    }
    
    const randomId = 'URM-' + Math.floor(100000 + Math.random() * 900000);
    
    const orderData = {
      orderId: randomId,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerAddress: customerAddress.trim(),
      deliveryZone,
      deliveryFee: shippingCost,
      cartItems: [...cartItems],
      subtotal: cartTotal,
      grandTotal,
      orderStatus: 'Pending',
      paymentStatus: 'Pending (COD)',
      paymentMethod: 'Cash on Delivery'
    };

    // Save to orders database & trigger Google Sheets automation webhook
    await saveOrder(orderData);
    
    setPlacedOrder(orderData);
    setOrderPlaced(true);
    clearCart();
    
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  if (orderPlaced && placedOrder) {
    return (
      <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: '580px', minHeight: '75vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div className="ios-checkout-card" style={{ padding: '2.25rem 1.5rem', width: '100%', boxShadow: '0 15px 45px rgba(5,66,49,0.1)' }}>
          <div style={{ width: '68px', height: '68px', borderRadius: '50%', background: '#ecfdf5', color: '#054231', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 24px rgba(16,185,129,0.2)' }}>
            <Check size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', color: '#054231', marginBottom: '0.25rem', fontWeight: '900', letterSpacing: '-0.02em' }}>
            অর্ডার সফল হয়েছে! 🎉
          </h2>
          <p style={{ color: '#059669', fontWeight: '700', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে।
          </p>
          <p style={{ color: '#6e6e73', fontSize: '0.86rem', marginBottom: '1.35rem' }}>
            অর্ডার ট্র্যাকিং আইডি: <strong style={{ color: '#054231' }}>#{placedOrder.orderId}</strong>
          </p>

          <div style={{ background: '#f5f5f7', padding: '1.25rem', borderRadius: '20px', textAlign: 'left', marginBottom: '1.35rem', border: '1px solid rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: '#6e6e73' }}>Customer Name:</span>
              <strong>{placedOrder.customerName}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: '#6e6e73' }}>Phone Number:</span>
              <strong>{placedOrder.customerPhone}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: '#6e6e73' }}>Delivery Address:</span>
              <span style={{ maxWidth: '60%', textAlign: 'right' }}>{placedOrder.customerAddress}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.88rem' }}>
              <span style={{ color: '#6e6e73' }}>Payment Method:</span>
              <strong style={{ color: '#054231' }}>Cash on Delivery</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.08)', fontSize: '1.15rem', color: '#054231', fontWeight: '900' }}>
              <span>Total Payable:</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {placedOrder.grandTotal.toLocaleString('en-US')}</span>
            </div>
          </div>

          <div style={{ background: '#ecfdf5', padding: '0.85rem 1rem', borderRadius: '14px', marginBottom: '1.35rem', display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#054231', fontSize: '0.86rem', textAlign: 'left', border: '1px solid #a7f3d0' }}>
            <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
            <span>আমাদের প্রতিনিধি শীঘ্রই কল করে আপনার পার্সেল ডেলিভারি নিশ্চিত করবেন।</span>
          </div>

          {/* Instant Invoice & Print Actions */}
          <div className="order-confirmed-actions-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.85rem' }}>
            <button 
              className="btn btn-outline-green" 
              onClick={() => setShowInvoiceModal(true)}
              style={{ width: '100%', padding: '0.75rem 0.5rem', fontSize: '0.86rem' }}
            >
              <FileText size={15} />
              <span>View Invoice</span>
            </button>

            <button 
              className="btn btn-secondary" 
              onClick={() => setShowInvoiceModal(true)}
              style={{ width: '100%', padding: '0.75rem 0.5rem', fontSize: '0.86rem', background: '#054231', color: '#ffffff' }}
            >
              <Printer size={15} />
              <span>Print / PDF</span>
            </button>
          </div>

          <Link to="/" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
            <span>Back to Home</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Invoice Modal */}
        {showInvoiceModal && (
          <InvoiceModal 
            order={placedOrder} 
            onClose={() => setShowInvoiceModal(false)} 
          />
        )}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', background: '#ffffff', padding: '2.5rem 1.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f5f7', color: '#86868b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ShoppingBag size={26} />
          </div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.35rem', fontWeight: '800', color: '#054231' }}>Your Bag is Empty</h2>
          <p style={{ color: '#6e6e73', fontSize: '0.88rem', marginBottom: '1.25rem' }}>
            Explore our pure organic foods and add items to your bag.
          </p>
          <Link to="/shop" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Explore Shop</span>
          </Link>
        </div>
      </div>
    );
  }

  const scrollToCheckout = () => {
    const el = document.getElementById('checkout-card-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('customerName');
      if (nameInput) setTimeout(() => nameInput.focus(), 400);
    }
  };

  return (
    <div className="container cart-page-container">
      <div className="cart-luxury-grid">
        {/* Left: Bag Items */}
        <div className="cart-left-col">
          <div className="cart-header-luxury-bar">
            <div className="cart-title-hub-left">
              <div className="cart-header-icon-disc">
                <ShoppingBag size={18} color="#054231" />
              </div>
              <div>
                <div className="cart-title-row-compact">
                  <h1 className="cart-main-heading">Shopping Bag</h1>
                  <span className="cart-item-count-badge">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
                </div>
                <span className="cart-sub-status-text">১০০% ক্যাশ অন ডেলিভারি (চেক করে পেমেন্ট)</span>
              </div>
            </div>

            <Link to="/shop" className="cart-add-more-pill-btn">
              <span className="add-more-plus-symbol">+</span>
              <span className="add-more-label">Add More Products</span>
            </Link>
          </div>

          {/* Mobile Fast Jump to Checkout Strip */}
          <button 
            type="button" 
            className="mobile-quick-jump-banner"
            onClick={scrollToCheckout}
          >
            <Zap size={14} className="jump-zap-icon" />
            <span>১-মিনিটে ক্যাশ অন ডেলিভারিতে অর্ডার করতে নিচে যান</span>
            <ArrowRight size={14} />
          </button>
          
          <div className="cart-items-list-card">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-app-item-card">
                {/* Top Row: Thumbnail + Product Name + Delete Button */}
                <div className="cart-app-item-top">
                  <div className="cart-app-thumb-box">
                    <img 
                      src={item.image || '/images/khejur-1.jpg'} 
                      alt={item.name} 
                      className="cart-app-thumb-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/khejur-1.jpg';
                      }}
                    />
                  </div>
                  <div className="cart-app-item-info">
                    <h3 className="cart-app-item-title">{item.name}</h3>
                    <span className="cart-app-item-sub">Net: 500g Glass Jar</span>
                  </div>
                  <button 
                    className="cart-app-trash-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                {/* Bottom Row: Pill Quantity Controls + Item Total Price */}
                <div className="cart-app-item-bottom">
                  <div className="cart-app-unit-price">
                    ৳ {item.price.toLocaleString('en-US')} / unit
                  </div>

                  <div className="cart-app-counter-group">
                    <div className="ios-qty-control">
                      <button 
                        className="ios-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >-</button>
                      <div className="ios-qty-val" style={{ fontFamily: 'Plus Jakarta Sans' }}>{item.quantity}</div>
                      <button 
                        className="ios-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <div className="cart-app-item-total" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                      ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clean Trust Strip */}
          <div className="cart-trust-row">
            <div className="trust-micro-item">
              <ShieldCheck size={16} color="#10b981" />
              <span>১০০% খাঁটি পণ্যের নিশ্চয়তা</span>
            </div>
            <div className="trust-micro-item">
              <Truck size={16} color="#10b981" />
              <span>ক্যাশ অন ডেলিভারি</span>
            </div>
          </div>
        </div>

        {/* Right: 1-Step Cash on Delivery Form */}
        <div id="checkout-card-section" className="cart-right-col">
          <div className="ios-checkout-card">
            <div className="checkout-badge-row">
              <span className="checkout-badge-pill">
                <Lock size={12} />
                <span>FAST & SECURE 1-STEP ORDER</span>
              </span>
            </div>
            
            <h2 className="checkout-card-title">ক্যাশ অন ডেলিভারিতে অর্ডার করুন</h2>
            <p className="checkout-card-sub">
              পণ্য হাতে পেয়ে দেখে ডেলিভারিম্যানকে মূল্য পরিশোধ করুন
            </p>

            <form onSubmit={handlePlaceOrder} className="checkout-form-body">
              <div className="form-field-group">
                <label htmlFor="customerName" className="ios-field-label">আপনার পূর্ণ নাম *</label>
                <input 
                  type="text" 
                  id="customerName"
                  className="ios-input-field" 
                  placeholder="যেমন: আশিকুর রহমান"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="customerPhone" className="ios-field-label">মোবাইল নম্বর *</label>
                <input 
                  type="tel" 
                  id="customerPhone"
                  inputMode="tel"
                  className="ios-input-field" 
                  placeholder="যেমন: 017XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="customerAddress" className="ios-field-label">সম্পূর্ণ ডেলিভারি ঠিকানা *</label>
                <textarea 
                  id="customerAddress"
                  className="ios-textarea-field" 
                  placeholder="বাসা নং, রোড নং, এলাকা ও থানার নাম লিখুন..."
                  rows="3"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Delivery Zone Selector */}
              <div className="form-field-group">
                <label className="ios-field-label">ডেলিভারি এলাকা নির্বাচন করুন</label>
                <div className="zone-segmented-picker">
                  <div 
                    className={`zone-picker-card ${deliveryZone === 'inside' ? 'active' : ''}`}
                    onClick={() => setDeliveryZone('inside')}
                  >
                    <div className="zone-radio-circle"></div>
                    <div className="zone-info-text">
                      <span className="zone-title-text">ঢাকার ভেতরে</span>
                      <span className="zone-delivery-time">১-২ দিনে ডেলিভারি</span>
                    </div>
                    <span className="zone-price-tag">৳ ৭০</span>
                  </div>

                  <div 
                    className={`zone-picker-card ${deliveryZone === 'outside' ? 'active' : ''}`}
                    onClick={() => setDeliveryZone('outside')}
                  >
                    <div className="zone-radio-circle"></div>
                    <div className="zone-info-text">
                      <span className="zone-title-text">ঢাকার বাইরে</span>
                      <span className="zone-delivery-time">২-৩ দিনে ডেলিভারি</span>
                    </div>
                    <span className="zone-price-tag">৳ ১৩০</span>
                  </div>
                </div>
              </div>

              {/* Order Calculation */}
              <div className="checkout-summary-box">
                <div className="summary-row-item">
                  <span>পণ্যের মূল্য (Subtotal):</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {cartTotal.toLocaleString('en-US')}</span>
                </div>
                <div className="summary-row-item">
                  <span>ডেলিভারি চার্জ:</span>
                  <span style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {shippingCost.toLocaleString('en-US')}</span>
                </div>
                <div className="summary-row-total">
                  <span>সর্বমোট প্রদেয় (Total):</span>
                  <span className="total-highlight-amount" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    ৳ {grandTotal.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* Trust Pill Right Above Submit */}
              <div className="checkout-instant-trust-bar">
                <CheckCircle2 size={15} color="#10b981" />
                <span>পার্সেল হাতে পেয়ে চেক করে পেমেন্ট করার সুবিধা</span>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary checkout-submit-btn"
              >
                <span>অর্ডার নিশ্চিত করুন (৳ {grandTotal.toLocaleString('en-US')})</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
