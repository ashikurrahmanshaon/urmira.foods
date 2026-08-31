import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Printer, 
  FileText, 
  Zap,
  Copy,
  User,
  Phone,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Truck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { saveOrder } from '../utils/orderStorage';
import InvoiceModal from '../components/InvoiceModal';
import SEO from '../components/SEO';
import {
  NaturalLeafIllustration,
  EcoDeliveryIllustration,
  FreeGiftIllustration,
  CashOnDeliveryIllustration,
  ArtisanTrustShieldIllustration
} from '../components/Illustrations';

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  
  const [deliveryZone, setDeliveryZone] = useState('inside');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  // Free shipping on cartTotal >= 2000
  const freeThreshold = 2000;
  const isFreeShipping = cartTotal >= freeThreshold;
  const baseShippingCost = deliveryZone === 'inside' ? 70 : 130;
  const shippingCost = isFreeShipping ? 0 : baseShippingCost;
  const grandTotal = cartTotal + shippingCost;
  const remainingForFree = Math.max(0, freeThreshold - cartTotal);
  const shippingProgress = Math.min(100, Math.round((cartTotal / freeThreshold) * 100));

  useEffect(() => {
    if (orderPlaced) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [orderPlaced]);

  const handleCopyOrderId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 3000);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('দয়া করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ডেলিভারি ঠিকানা পূরণ করুন।');
      return;
    }

    if (cartItems.length === 0) {
      alert('আপনার শপিং ব্যাগে কোনো পণ্য নেই।');
      return;
    }
    
    setIsSubmitting(true);
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

    try {
      await saveOrder(orderData);
      setPlacedOrder(orderData);
      setOrderPlaced(true);
      clearCart();
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (err) {
      setPlacedOrder(orderData);
      setOrderPlaced(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  // 1. Order Placed Success View
  if (orderPlaced && placedOrder) {
    return (
      <div className="container cart-page-container order-confirmed-viewport">
        <SEO 
          title="অর্ডার নিশ্চিতকরণ | ধন্যবাদ" 
          description="আপনার অর্ডার সফলভাবে গৃহীত হয়েছে।" 
          canonicalPath="/cart" 
        />
        <div className="order-confirmed-success-card">
          <div className="success-lottie-circle">
            <Check size={36} color="#ffffff" strokeWidth={3} />
          </div>

          <div className="confirmed-header-block">
            <span className="confirmed-pill-tag">
              <NaturalLeafIllustration size={14} />
              <span>অর্ডার সফলভাবে গৃহীত হয়েছে</span>
            </span>
            <h1 className="confirmed-title">ধন্যবাদ! আপনার অর্ডার কনফার্ম হয়েছে</h1>
            <p className="confirmed-sub-p">
              খাঁটি ও প্রাকৃতিক খাবার বেছে নেওয়ার জন্য ধন্যবাদ। আমাদের প্রতিনিধি দ্রুত কল করে পার্সেল প্রস্তুত করবেন।
            </p>
          </div>

          <div className="order-id-highlight-box">
            <div className="id-text-group">
              <span className="id-sub-label">অর্ডার ট্র্যাকিং আইডি:</span>
              <span className="id-code-number">{placedOrder.orderId}</span>
            </div>
            <button 
              type="button" 
              className="btn-copy-id"
              onClick={() => handleCopyOrderId(placedOrder.orderId)}
              title="Copy Order ID"
            >
              {copiedId ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
              <span>{copiedId ? 'কপি হয়েছে' : 'কপি করুন'}</span>
            </button>
          </div>

          <div className="order-receipt-summary-box">
            <div className="receipt-row">
              <span className="receipt-lbl">গ্রাহকের নাম:</span>
              <strong className="receipt-val">{placedOrder.customerName}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-lbl">মোবাইল নম্বর:</span>
              <strong className="receipt-val">{placedOrder.customerPhone}</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-lbl">ডেলিভারি ঠিকানা:</span>
              <span className="receipt-val address-val">{placedOrder.customerAddress}</span>
            </div>
            <div className="receipt-row">
              <span className="receipt-lbl">পেমেন্ট মেথড:</span>
              <strong className="receipt-val" style={{ color: '#054231' }}>ক্যাশ অন ডেলিভারি (COD)</strong>
            </div>
            <div className="receipt-row">
              <span className="receipt-lbl">ডেলিভারি চার্জ:</span>
              <span className="receipt-val">
                {placedOrder.deliveryFee === 0 ? (
                  <span className="receipt-free-badge">ফ্রি ডেলিভারি</span>
                ) : (
                  '৳ ' + placedOrder.deliveryFee
                )}
              </span>
            </div>
            
            <div className="receipt-divider"></div>

            <div className="receipt-total-row">
              <span>সর্বমোট প্রদেয় টাকা:</span>
              <span className="receipt-grand-amount">৳ {placedOrder.grandTotal.toLocaleString('en-US')}</span>
            </div>
          </div>

          <div className="order-delivery-guarantee-strip">
            <EcoDeliveryIllustration size={22} />
            <span>ডেলিভারিম্যান আসার পর পার্সেল খুলে চেক করে টাকা পরিশোধ করবেন।</span>
          </div>

          <div className="order-confirmed-actions-grid">
            <button 
              type="button" 
              className="btn btn-outline-green" 
              onClick={() => setShowInvoiceModal(true)}
            >
              <FileText size={16} />
              <span>মেমো / ইনভয়েস দেখুন</span>
            </button>

            <button 
              type="button" 
              className="btn btn-primary" 
              onClick={() => setShowInvoiceModal(true)}
            >
              <Printer size={16} />
              <span>প্রিন্ট / ডাউনলোড</span>
            </button>
          </div>

          <Link to="/" className="btn btn-secondary order-back-home-btn">
            <span>হোম পেজে ফিরে যান</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {showInvoiceModal && (
          <InvoiceModal 
            order={placedOrder} 
            onClose={() => setShowInvoiceModal(false)} 
          />
        )}
      </div>
    );
  }

  // 2. Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="container cart-empty-viewport">
        <SEO 
          title="শপিং ব্যাগ খালি | URMIRA" 
          description="আপনার ব্যাগে কোনো পণ্য নেই।" 
          canonicalPath="/cart" 
        />
        <div className="cart-empty-luxury-card">
          <div className="cart-empty-icon-circle">
            <ShoppingBag size={32} color="#054231" />
          </div>
          <h2 className="cart-empty-title">আপনার ব্যাগটি বর্তমানে খালি</h2>
          <p className="cart-empty-desc">
            আমাদের ১০০% খাঁটি গাওয়া ঘি ও স্পেশাল খেজুরের পাওয়ার বোম্ব ঘুরে দেখুন এবং আপনার পছন্দের পণ্যটি ব্যাগে যোগ করুন।
          </p>
          <Link to="/shop" className="btn btn-primary cart-empty-cta">
            <ArrowLeft size={16} />
            <span>পণ্য কালেকশন দেখুন</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-master-page-wrapper">
      <SEO 
        title="শপিং ব্যাগ ও ১-মিনিট ক্যাশ অন ডেলিভারি চেকআউট | URMIRA"
        description="উর্মিরা ফুডস নিরাপদ ক্যাশ অন ডেলিভারি চেকআউট। ১-মিনিটে অর্ডার করুন এবং পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন।"
        keywords="urmira cart, buy pure cow ghee online, cash on delivery checkout"
        canonicalPath="/cart"
      />
      <div className="container cart-aligned-container">
        {/* Symmetrical 2-Column Luxury Layout */}
        <div className="cart-split-layout-grid">
          {/* Left Column: Cart Items Header & Stack */}
          <div className="cart-items-column">
            {/* Direct Aligned Left Header */}
            <div className="cart-column-head">
              <div className="cart-head-title-row">
                <h1 className="cart-title-clean">শপিং ব্যাগ</h1>
                <span className="cart-badge-count">{cartItems.length}টি আইটেম</span>
              </div>
              <Link to="/shop" className="cart-add-more-link">
                <span>+ আরও যোগ করুন</span>
              </Link>
            </div>

            {/* Free Delivery Dynamic Progress Meter */}
            <div className="cart-free-shipping-card">
              <div className="shipping-progress-top-row">
                <div className="shipping-badge-text">
                  <FreeGiftIllustration size={16} />
                  <span>
                    {isFreeShipping ? (
                      <strong className="shipping-success-text">অভিনন্দন! ফ্রি ডেলিভারি আনলক হয়েছে</strong>
                    ) : (
                      <>আর মাত্র <strong>৳ {remainingForFree.toLocaleString('en-US')}</strong> টাকার পণ্য নিলেই <strong>ফ্রি ডেলিভারি</strong>!</>
                    )}
                  </span>
                </div>
                <span className="shipping-progress-percent">{shippingProgress}%</span>
              </div>
              <div className="shipping-progress-track">
                <div 
                  className={`shipping-progress-fill ${isFreeShipping ? 'is-complete' : ''}`}
                  style={{ width: `${shippingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="cart-items-stack">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-card-luxury">
                  {/* Photo Thumbnail */}
                  <div className="cart-item-photo-hub">
                    <img 
                      src={item.image || (item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg')} 
                      alt={item.name} 
                      className="cart-item-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                      }}
                    />
                  </div>

                  {/* Info Column */}
                  <div className="cart-item-details-hub">
                    <div className="cart-item-title-row">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <span className="cart-item-weight-badge">Net: {item.weight || '৫০০ গ্রাম'} • ১০০% খাঁটি</span>
                      </div>
                      <button 
                        type="button"
                        className="cart-item-remove-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        title="পণ্যটি সরান"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Price, Stepper & Line Total Row */}
                    <div className="cart-item-bottom-bar">
                      <span className="cart-item-unit-price">৳ {item.price.toLocaleString('en-US')}</span>

                      <div className="cart-item-stepper-and-total">
                        {/* iOS Style Quantity Stepper */}
                        <div className="luxury-stepper-control">
                          <button 
                            type="button"
                            className="stepper-btn stepper-minus"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >−</button>
                          <span className="stepper-count">{item.quantity}</span>
                          <button 
                            type="button"
                            className="stepper-btn stepper-plus"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >+</button>
                        </div>

                        <span className="cart-item-line-total">
                          ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Reassurance Chips */}
            <div className="cart-trust-badges-row">
              <div className="cart-trust-chip">
                <Truck size={15} color="#054231" />
                <span>পার্সেল খুলে দেখে মূল্য পরিশোধের সুবিধা</span>
              </div>
              <div className="cart-trust-chip">
                <ShieldCheck size={15} color="#054231" />
                <span>১০০% খাঁটি ও নির্ভেজাল গ্যারান্টি</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Conversion Express Checkout Form */}
          <div className="cart-checkout-column">
            <div className="checkout-luxury-card-sheet">
              {/* Card Header */}
              <div className="checkout-sheet-header">
                <div className="checkout-instant-badge">
                  <Zap size={14} color="#d97706" />
                  <span>১-মিনিট ক্যাশ অন ডেলিভারি</span>
                </div>
                <h2 className="checkout-sheet-title">অর্ডার ফর্ম পূরণ করুন</h2>
                <p className="checkout-sheet-desc">
                  পার্সেল হাতে পেয়ে সম্পূর্ণ চেক করে মূল্য পরিশোধ করবেন।
                </p>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handlePlaceOrder} className="checkout-form-container">
                {/* 1. Customer Name */}
                <div className="checkout-input-group">
                  <label htmlFor="customerName" className="checkout-label">
                    <User size={14} className="label-icon" />
                    <span>আপনার পূর্ণ নাম *</span>
                  </label>
                  <input 
                    type="text" 
                    id="customerName"
                    className="checkout-styled-input" 
                    placeholder="যেমন: তানভীর আহমেদ"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    autoComplete="name"
                    enterKeyHint="next"
                    required
                  />
                </div>

                {/* 2. Customer Phone */}
                <div className="checkout-input-group">
                  <label htmlFor="customerPhone" className="checkout-label">
                    <Phone size={14} className="label-icon" />
                    <span>সচল মোবাইল নম্বর *</span>
                  </label>
                  <input 
                    type="tel" 
                    id="customerPhone"
                    inputMode="tel"
                    className="checkout-styled-input" 
                    placeholder="যেমন: 017XXXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    autoComplete="tel"
                    enterKeyHint="next"
                    required
                  />
                  <span className="checkout-input-hint">ডেলিভারির সময় রাইডার এই নম্বরে ফোন করবেন।</span>
                </div>

                {/* 3. Customer Address */}
                <div className="checkout-input-group">
                  <label htmlFor="customerAddress" className="checkout-label">
                    <MapPin size={14} className="label-icon" />
                    <span>সম্পূর্ণ ডেলিভারি ঠিকানা *</span>
                  </label>
                  <textarea 
                    id="customerAddress"
                    className="checkout-styled-textarea" 
                    placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলার নাম লিখুন..."
                    rows="3"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    autoComplete="street-address"
                    enterKeyHint="done"
                    required
                  ></textarea>
                </div>

                {/* 4. Delivery Area Selector */}
                <div className="checkout-input-group">
                  <label className="checkout-label">
                    <Truck size={14} className="label-icon" />
                    <span>ডেলিভারি এলাকা নির্বাচন করুন:</span>
                  </label>
                  <div className="delivery-zone-cards-grid">
                    {/* Inside Dhaka */}
                    <div 
                      className={`delivery-zone-option-card ${deliveryZone === 'inside' ? 'selected' : ''}`}
                      onClick={() => setDeliveryZone('inside')}
                    >
                      <div className="zone-radio-indicator">
                        <span className="radio-inner-dot"></span>
                      </div>
                      <div className="zone-text-block">
                        <strong className="zone-name">ঢাকার ভেতরে</strong>
                        <span className="zone-timeline">১-২ দিনে দ্রুত ডেলিভারি</span>
                      </div>
                      <span className="zone-cost-pill">
                        {isFreeShipping ? 'ফ্রি' : '৳ ৭০'}
                      </span>
                    </div>

                    {/* Outside Dhaka */}
                    <div 
                      className={`delivery-zone-option-card ${deliveryZone === 'outside' ? 'selected' : ''}`}
                      onClick={() => setDeliveryZone('outside')}
                    >
                      <div className="zone-radio-indicator">
                        <span className="radio-inner-dot"></span>
                      </div>
                      <div className="zone-text-block">
                        <strong className="zone-name">ঢাকার বাইরে</strong>
                        <span className="zone-timeline">২-৩ দিনে হোম ডেলিভারি</span>
                      </div>
                      <span className="zone-cost-pill">
                        {isFreeShipping ? 'ফ্রি' : '৳ ১৩০'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Summary Calculation Box */}
                <div className="checkout-order-summary-box">
                  <div className="summary-line">
                    <span className="summary-lbl">পণ্যের মোট মূল্য (Subtotal):</span>
                    <span className="summary-val">৳ {cartTotal.toLocaleString('en-US')}</span>
                  </div>
                  <div className="summary-line">
                    <span className="summary-lbl">ডেলিভারি চার্জ:</span>
                    <span className="summary-val">
                      {isFreeShipping ? (
                        <span className="free-shipping-tag">৳ ০ (ফ্রি ডেলিভারি)</span>
                      ) : (
                        '৳ ' + shippingCost.toLocaleString('en-US')
                      )}
                    </span>
                  </div>
                  <div className="summary-divider-line"></div>
                  <div className="summary-grand-total-row">
                    <span className="grand-lbl">সর্বমোট প্রদেয় টাকা:</span>
                    <span className="grand-amount-highlight">
                      ৳ {grandTotal.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>

                {/* Main Submit Button */}
                <button 
                  type="submit" 
                  className="btn btn-primary checkout-primary-confirm-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>অর্ডার প্রসেস হচ্ছে...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>অর্ডার নিশ্চিত করুন • ৳ {grandTotal.toLocaleString('en-US')}</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {/* Security Reassurance */}
                <div className="checkout-guarantee-footer">
                  <ShieldCheck size={16} color="#054231" />
                  <span>১০০% ক্যাশ অন ডেলিভারি • পার্সেল চেক করে পেমেন্ট</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
