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
  Copy
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
  const isFreeShipping = cartTotal >= 2000;
  const baseShippingCost = deliveryZone === 'inside' ? 70 : 130;
  const shippingCost = isFreeShipping ? 0 : baseShippingCost;
  const grandTotal = cartTotal + shippingCost;

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
            <Check size={40} color="#ffffff" strokeWidth={3} />
          </div>

          <div className="confirmed-header-block">
            <span className="confirmed-pill-tag">
              <NaturalLeafIllustration size={14} />
              <span>অর্ডার সফল হয়েছে</span>
            </span>
            <h1 className="confirmed-title">অভিনন্দন! আপনার অর্ডার কনফার্ম হয়েছে</h1>
            <p className="confirmed-sub-p">
              খাঁটি ও প্রাকৃতিক খাবার বেছে নেওয়ার জন্য ধন্যবাদ। আমাদের প্রতিনিধি দ্রুত কল করে পার্সেল নিশ্চিত করবেন।
            </p>
          </div>

          <div className="order-id-highlight-box">
            <div className="id-text-group">
              <span className="id-sub-label">আপনার অর্ডার আইডি:</span>
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
                {placedOrder.deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>ফ্রি ডেলিভারি</strong> : '৳ ' + placedOrder.deliveryFee}
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
              <span>ইনভয়েস দেখুন</span>
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
            <span>হোমে ফিরে যান</span>
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

  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 1rem 6rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', background: '#ffffff', padding: '3rem 2rem', borderRadius: '28px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#ecfdf5', color: '#054231', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <ShoppingBag size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.4rem', fontWeight: '800', color: '#054231' }}>আপনার ব্যাগটি বর্তমানে খালি</h2>
          <p style={{ color: '#6e6e73', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
            আমাদের ১০০% খাঁটি গাওয়া ঘি ও স্পেশাল খেজুরের পাওয়ার বোম্ব ঘুরে দেখুন এবং ব্যাগে যুক্ত করুন।
          </p>
          <Link to="/shop" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
            <ArrowLeft size={16} />
            <span>প্রোডাক্ট কালেকশন দেখুন</span>
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
      <SEO 
        title="শপিং ব্যাগ ও ক্যাশ অন ডেলিভারি চেকআউট"
        description="উর্মিরা ফুডস নিরাপদ ক্যাশ অন ডেলিভারি চেকআউট। ১-মিনিটে অর্ডার করুন এবং পার্সেল হাতে পেয়ে মূল্য পরিশোধ করুন।"
        keywords="urmira cart, buy pure cow ghee online, cash on delivery checkout"
        canonicalPath="/cart"
      />
      <div className="cart-luxury-grid">
        <div className="cart-left-col">
          <div className="cart-clean-header-row">
            <div className="cart-title-clean-group">
              <h1 className="cart-clean-heading">শপিং ব্যাগ</h1>
              <span className="cart-clean-count-pill">{cartItems.length} {cartItems.length === 1 ? 'আইটেম' : 'আইটেম'}</span>
            </div>

            <Link to="/shop" className="cart-continue-shopping-link">
              <span>+ আরও পণ্য যোগ করুন</span>
            </Link>
          </div>

          {isFreeShipping ? (
            <div className="cart-free-shipping-unlocked-banner">
              <FreeGiftIllustration size={18} />
              <span>অভিনন্দন! ৳২,০০০+ টাকার অর্ডারে <strong>ফ্রি ডেলিভারি</strong> কার্যকর হয়েছে!</span>
            </div>
          ) : (
            <div className="cart-free-shipping-goal-banner">
              <EcoDeliveryIllustration size={18} />
              <span>আর মাত্র <strong>৳ {(2000 - cartTotal).toLocaleString('en-US')}</strong> টাকার পণ্য যোগ করলেই ডেলিভারি চার্জ একদম ফ্রি!</span>
            </div>
          )}

          <button 
            type="button" 
            className="mobile-quick-jump-banner"
            onClick={scrollToCheckout}
          >
            <Zap size={14} className="jump-zap-icon" />
            <span>সরাসরি ১-মিনিটে অর্ডার ফর্ম পূরণ করতে চাপ দিন</span>
            <ArrowRight size={14} />
          </button>
          
          <div className="cart-items-list-card">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-app-item-card">
                <div className="cart-app-item-top">
                  <div className="cart-app-thumb-box">
                    <img 
                      src={item.image || (item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg')} 
                      alt={item.name} 
                      className="cart-app-thumb-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = item.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                      }}
                    />
                  </div>
                  <div className="cart-app-item-info">
                    <h3 className="cart-app-item-title">{item.name}</h3>
                    <span className="cart-app-item-sub">Net: {item.weight || '৫০০ গ্রাম'} ফুড গ্রেড প্যাক</span>
                  </div>
                  <button 
                    className="cart-app-trash-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div className="cart-app-item-bottom">
                  <div className="cart-app-unit-price">
                    ৳ {item.price.toLocaleString('en-US')} / পিস
                  </div>

                  <div className="cart-app-counter-group">
                    <div className="ios-qty-control">
                      <button 
                        className="ios-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >-</button>
                      <div className="ios-qty-val">{item.quantity}</div>
                      <button 
                        className="ios-qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >+</button>
                    </div>

                    <div className="cart-app-item-total">
                      ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div id="checkout-card-section" className="cart-right-col">
          <div className="ios-checkout-card">
            <div className="checkout-card-top-head">
              <span className="checkout-badge-pill">
                <CashOnDeliveryIllustration size={16} />
                <span>নিরাপদ ও দ্রুত চেকআউট</span>
              </span>
              <h2 className="checkout-card-title">ক্যাশ অন ডেলিভারি অর্ডার</h2>
              <p className="checkout-card-sub">
                পার্সেল হাতে পেয়ে সম্পূর্ণ চেক করে মূল্য পরিশোধ করবেন।
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="checkout-form-body">
              <div className="form-field-group">
                <label htmlFor="customerName" className="ios-field-label">আপনার পূর্ণ নাম *</label>
                <input 
                  type="text" 
                  id="customerName"
                  className="ios-input-field" 
                  placeholder="যেমন: মোঃ আশিকুর রহমান"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  autoComplete="name"
                  enterKeyHint="next"
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="customerPhone" className="ios-field-label">সচল মোবাইল নম্বর *</label>
                <input 
                  type="tel" 
                  id="customerPhone"
                  inputMode="tel"
                  className="ios-input-field" 
                  placeholder="যেমন: 017XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  autoComplete="tel"
                  enterKeyHint="next"
                  required
                />
                <span className="field-helper-hint">ডেলিভারির আগে রাইডার এই নম্বরে কল করবেন।</span>
              </div>

              <div className="form-field-group">
                <label htmlFor="customerAddress" className="ios-field-label">সম্পূর্ণ ডেলিভারি ঠিকানা *</label>
                <textarea 
                  id="customerAddress"
                  className="ios-textarea-field" 
                  placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলার নাম লিখুন..."
                  rows="3"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  autoComplete="street-address"
                  enterKeyHint="done"
                  required
                ></textarea>
              </div>

              <div className="form-field-group">
                <label className="ios-field-label">ডেলিভারি এলাকা নির্বাচন করুন</label>
                <div className="zone-segmented-picker">
                  <div 
                    className={'zone-picker-card ' + (deliveryZone === 'inside' ? 'active' : '')}
                    onClick={() => setDeliveryZone('inside')}
                  >
                    <div className="zone-radio-circle"></div>
                    <div className="zone-info-text">
                      <span className="zone-title-text">ঢাকার ভেতরে</span>
                      <span className="zone-delivery-time">১-২ দিনে দ্রুত ডেলিভারি</span>
                    </div>
                    <span className="zone-price-tag">
                      {isFreeShipping ? 'ফ্রি' : '৳ ৭০'}
                    </span>
                  </div>

                  <div 
                    className={'zone-picker-card ' + (deliveryZone === 'outside' ? 'active' : '')}
                    onClick={() => setDeliveryZone('outside')}
                  >
                    <div className="zone-radio-circle"></div>
                    <div className="zone-info-text">
                      <span className="zone-title-text">ঢাকার বাইরে (সারাদেশে)</span>
                      <span className="zone-delivery-time">২-৩ দিনে হোম ডেলিভারি</span>
                    </div>
                    <span className="zone-price-tag">
                      {isFreeShipping ? 'ফ্রি' : '৳ ১৩০'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="checkout-summary-box">
                <div className="summary-row-item">
                  <span>পণ্যের মোট মূল্য (Subtotal):</span>
                  <span>৳ {cartTotal.toLocaleString('en-US')}</span>
                </div>
                <div className="summary-row-item">
                  <span>ডেলিভারি চার্জ:</span>
                  <span>
                    {isFreeShipping ? (
                      <strong style={{ color: '#10b981' }}>৳ ০ (ফ্রি ডেলিভারি)</strong>
                    ) : (
                      '৳ ' + shippingCost.toLocaleString('en-US')
                    )}
                  </span>
                </div>
                <div className="summary-row-total">
                  <span>সর্বমোট প্রদেয় টাকা (Total):</span>
                  <span className="total-highlight-amount">
                    ৳ {grandTotal.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary checkout-submit-btn"
                disabled={isSubmitting}
              >
                <span>
                  {isSubmitting ? 'অর্ডার প্রসেস হচ্ছে...' : 'অর্ডার নিশ্চিত করুন (৳ ' + grandTotal.toLocaleString('en-US') + ')'}
                </span>
                <ArrowRight size={16} />
              </button>

              <div className="checkout-security-notice">
                <ArtisanTrustShieldIllustration size={16} />
                <span>১০০% ক্যাশ অন ডেলিভারি • পার্সেল চেক করে পেমেন্ট</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
