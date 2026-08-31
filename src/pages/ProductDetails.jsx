import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  PhoneCall, 
  Zap, 
  Award, 
  Sparkles, 
  ZoomIn, 
  X, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';
import {
  NaturalLeafIllustration,
  FreeGiftIllustration,
  ArtisanTrustShieldIllustration,
  PureGheeClayMatkaIllustration,
  PowerBombBowlIllustration
} from '../components/Illustrations';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits'); // benefits | ingredients | delivery
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Extract ID from path params or query params (e.g., product.html?id=1)
  const urlParams = new URLSearchParams(window.location.search);
  const queryId = urlParams.get('id');
  const targetId = id || queryId || '1';

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    setActiveImgIndex(0);
  }, [id, queryId]);

  const product = products.find((p) => p.id === parseInt(targetId)) || products[0];

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '5rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#054231' }}>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          <span>Back to Shop</span>
        </Link>
      </div>
    );
  }

  const gallery = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image || (product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg')];

  const currentImage = gallery[activeImgIndex] || gallery[0];

  const handlePrevImage = (e) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e?.stopPropagation();
    setActiveImgIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate('/cart');
  };

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const discountPercent = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  const englishBadge = product.id === 1 ? '100% PURE & ARTISAN' : 'ORGANIC ENERGY BOOSTER';
  const englishSubtitle = product.id === 1 ? 'Handcrafted Pure Cow Ghee' : 'Special Khurjur & Dry Fruits Power Bomb';
  const displayTitle = product.name.split('(')[0].trim();

  // Full Google Rich Result Schema for Product
  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "image": [
      `https://urmira.com${product.image || '/images/ghee-1.jpg'}`,
      "https://urmira.com/images/ghee-2.jpg"
    ],
    "description": product.fullDesc || product.shortDesc,
    "sku": `URM-00${product.id}`,
    "mpn": `URMIRA-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": "URMIRA Organic Foods"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://urmira.com/product/${product.id}`,
      "priceCurrency": "BDT",
      "price": product.price,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "URMIRA Organic Foods"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating || 4.9,
      "reviewCount": product.reviewsCount || 148,
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <div className="product-details-page-wrapper">
      <SEO 
        title={`${product.name} (মূল্য: ৳ ${product.price})`}
        description={`${product.shortDesc} ১০০% খাঁটি ও নির্ভেজাল গ্যারান্টি। হোম ডেলিভারি ও ক্যাশ অন ডেলিভারি সুবিধা।`}
        keywords={`${product.name}, খাঁটি গাওয়া ঘি দাম, pure cow ghee 500g price in bd, buy gawa ghee dhaka, gawa ghee benefits`}
        canonicalPath={`/product/${product.id}`}
        image={product.image || '/images/ghee-1.jpg'}
        type="product"
        schema={productSchema}
      />
      <div className="container">
        {/* Back Navigation Button */}
        <div className="detail-top-nav-bar">
          <Link to="/shop" className="detail-back-capsule">
            <ChevronLeft size={16} />
            <span>সব প্রোডাক্ট দেখুন</span>
          </Link>
        </div>

        {/* Main 2-Column Responsive Layout */}
        <div className="product-showcase-master-grid">
          {/* Left Column: Interactive Product Showcase */}
          <div className="product-gallery-column">
            <div className="gallery-main-card">
              {/* Top Badges */}
              <div className="gallery-badges-overlay">
                <span className="gallery-floating-badge">
                  <FreeGiftIllustration size={14} />
                  <span>{englishBadge}</span>
                </span>
                <span className="gallery-counter-tag">
                  {activeImgIndex + 1} / {gallery.length}
                </span>
              </div>

              {/* Main Image Frame (Studio Portrait) */}
              <div 
                className="gallery-photo-viewport"
                onClick={() => setIsLightboxOpen(true)}
                title="Click to Zoom Fullscreen"
              >
                <img 
                  src={currentImage} 
                  alt={`${product.name} - View ${activeImgIndex + 1}`} 
                  className="gallery-active-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                  }}
                />

                {/* Floating Bottom Pills */}
                <div className="gallery-bottom-overlay">
                  <div className="gallery-proof-pill">
                    <ArtisanTrustShieldIllustration size={16} />
                    <span>১০০% খাঁটি ও ল্যাব টেস্টেড</span>
                  </div>

                  <div className="gallery-zoom-pill">
                    <ZoomIn size={13} />
                    <span>Zoom</span>
                  </div>
                </div>

                {/* Left & Right Arrow Controls */}
                {gallery.length > 1 && (
                  <>
                    <button 
                      type="button" 
                      className="gallery-arrow-button arrow-prev" 
                      onClick={handlePrevImage}
                      aria-label="Previous Image"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      type="button" 
                      className="gallery-arrow-button arrow-next" 
                      onClick={handleNextImage}
                      aria-label="Next Image"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row */}
              {gallery.length > 1 && (
                <div className="gallery-thumbs-track">
                  {gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`gallery-thumb-item ${activeImgIndex === idx ? 'selected' : ''}`}
                      onClick={() => setActiveImgIndex(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Thumb ${idx + 1}`} 
                        className="thumb-inner-img"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Info & Purchase Card */}
          <div className="product-info-column">
            <div className="product-info-card">
              <span className="info-top-badge">
                <NaturalLeafIllustration size={15} />
                <span>{englishBadge}</span>
              </span>
              
              <h1 className="info-product-title">{displayTitle}</h1>
              <span className="info-product-subtitle">{englishSubtitle}</span>

              {/* Rating & Net Weight */}
              <div className="info-meta-row">
                <div className="info-stars-flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#d97706" color="#d97706" />
                  ))}
                </div>
                <span className="info-rating-label">{product.rating} ({product.reviewsCount}+ কাস্টমার রিভিউ)</span>
                <span className="info-weight-pill">Net: 500g</span>
              </div>

              {/* Price Row */}
              <div className="info-price-container">
                <div className="info-price-main">
                  ৳ {product.price.toLocaleString('en-US')}
                </div>
                {product.oldPrice && (
                  <div className="info-price-old">
                    ৳ {product.oldPrice.toLocaleString('en-US')}
                  </div>
                )}
                {savings > 0 && (
                  <span className="info-save-tag">
                    {discountPercent}% OFF (SAVE ৳{savings})
                  </span>
                )}
              </div>

              <p className="info-short-summary">
                {product.shortDesc}
              </p>

              {/* Clean Tabs */}
              <div className="info-tabs-wrapper">
                <div className="info-tab-headers">
                  <button 
                    type="button"
                    className={`info-tab-btn ${activeTab === 'benefits' ? 'active' : ''}`}
                    onClick={() => setActiveTab('benefits')}
                  >
                    স্বাস্থ্য উপকারিতা
                  </button>
                  <button 
                    type="button"
                    className={`info-tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ingredients')}
                  >
                    উপাদানসমূহ
                  </button>
                  <button 
                    type="button"
                    className={`info-tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
                    onClick={() => setActiveTab('delivery')}
                  >
                    ডেলিভারি ও ক্যাশ অন
                  </button>
                </div>

                <div className="info-tab-panel">
                  {activeTab === 'benefits' && (
                    <ul className="tab-points-list">
                      {product.benefits.map((b, i) => (
                        <li key={i} className="tab-point-item">
                          <CheckCircle2 size={16} color="#10b981" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'ingredients' && (
                    <div className="tab-text-block">
                      {product.id === 1 ? (
                        <p>১০০% খাঁটি গরুর দুধের ননী ও মাখন। সম্পূর্ণ প্রাকৃতিকভাবে ঐতিহ্যবাহী পদ্ধতিতে জ্বাল দেওয়া, কোনো কেমিক্যাল বা কৃত্রিম ফ্লেভার ছাড়া শতভাগ বিশুদ্ধ।</p>
                      ) : (
                        <p>সেরা মানের মরিয়ম ও আজওয়া খেজুর, খাঁটি প্রাকৃতিক মধু, রোস্টেড কাজুবাদাম, কাঠবাদাম, পেস্তাবাদাম, আখরোট এবং স্বাস্থ্যকর শক্তির বীজ।</p>
                      )}
                    </div>
                  )}

                  {activeTab === 'delivery' && (
                    <div className="tab-text-block">
                      <p>• <strong>ঢাকার ভেতরে:</strong> ২৪-৪৮ ঘণ্টার মধ্যে দ্রুত হোম ডেলিভারি (চার্জ: ৳ ৭০)।</p>
                      <p>• <strong>ঢাকার বাইরে:</strong> সারাদেশে ২-৩ কার্যদিবসের মধ্যে হোম ডেলিভারি (চার্জ: ৳ ১৩০)।</p>
                      <p>• <strong>ক্যাশ অন ডেলিভারি (COD):</strong> পার্সেল হাতে পেয়ে সম্পূর্ণ চেক করে মূল্য পরিশোধের নিশ্চয়তা।</p>
                      <p>• <strong>ফ্রি ডেলিভারি:</strong> ৳২,০০০ টাকার যেকোনো অর্ডারে ডেলিভারি চার্জ একদম ফ্রি!</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Picker */}
              <div className="info-quantity-row">
                <span className="qty-label">পরিমাণ (Quantity):</span>
                <div className="qty-counter-control">
                  <button 
                    type="button" 
                    className="qty-step-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >-</button>
                  <span className="qty-step-value">{quantity}</span>
                  <button 
                    type="button" 
                    className="qty-step-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >+</button>
                </div>
              </div>

              {/* Purchase Buttons */}
              <div className="info-action-buttons">
                <button 
                  type="button" 
                  className={`btn-action-bag ${added ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  aria-label="Add to Bag"
                >
                  {added ? (
                    <>
                      <Check size={18} color="#054231" />
                      <span>ব্যাগে যুক্ত হয়েছে</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      <span>ব্যাগে যোগ করুন</span>
                    </>
                  )}
                </button>

                <button 
                  type="button" 
                  className="btn-action-buy-now"
                  onClick={handleBuyNow}
                  aria-label="Order Now"
                >
                  <Zap size={18} />
                  <span>এখনই অর্ডার করুন</span>
                </button>
              </div>

              {/* Direct Phone Helpline */}
              <a href="tel:01712345678" className="info-helpline-anchor">
                <div className="phone-pulsing-badge">
                  <PhoneCall size={14} />
                </div>
                <span>ফোনে সরাসরি অর্ডার করুন: <strong>01712-345678</strong></span>
              </a>
            </div>
          </div>
        </div>

        {/* 3. Real Quality Proof Grid */}
        <section className="product-proof-showcase-section">
          <div className="proof-head-box">
            <span className="proof-pill-tag">
              <Sparkles size={12} />
              <span>বাস্তব ছবি ও আনবক্সিং প্রমাণ</span>
            </span>
            <h2 className="proof-heading">
              অরিজিনাল প্রোডাক্ট ফটো গ্যালারি
            </h2>
            <p className="proof-subtext">
              ১০০% আসল প্যাকেজিং ও অরিজিনাল স্টুডিও ফটোগ্রাফি। ছবিতে যা দেখছেন, ঠিক তাই পাবেন।
            </p>
          </div>

          <div className="proof-cards-grid">
            {gallery.map((imgUrl, index) => (
              <div 
                key={index} 
                className="proof-single-card"
                onClick={() => {
                  setActiveImgIndex(index);
                  setIsLightboxOpen(true);
                }}
              >
                <div className="proof-img-holder">
                  <img 
                    src={imgUrl} 
                    alt={`${displayTitle} Photo ${index + 1}`} 
                    className="proof-img-element"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
                    }}
                  />
                  <div className="proof-zoom-overlay">
                    <ZoomIn size={24} color="#ffffff" />
                    <span>বড় করে দেখুন</span>
                  </div>
                </div>
                <div className="proof-card-label">
                  <ShieldCheck size={14} color="#10b981" />
                  <span>অরিজিনাল কোয়ালিটি - ছবি #{index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="gallery-lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
            <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                className="lightbox-close-btn"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close Lightbox"
              >
                <X size={22} />
              </button>

              <img 
                src={currentImage} 
                alt={product.name} 
                className="lightbox-full-img" 
              />

              <div className="lightbox-nav-footer">
                <button type="button" className="lightbox-nav-btn" onClick={handlePrevImage}>
                  <ChevronLeft size={20} />
                  <span>আগের ছবি</span>
                </button>
                <span className="lightbox-counter-label">
                  {activeImgIndex + 1} / {gallery.length}
                </span>
                <button type="button" className="lightbox-nav-btn" onClick={handleNextImage}>
                  <span>পরের ছবি</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Sticky Mobile Quick Bar */}
      <div className="product-mobile-bottom-bar no-print">
        <div className="mobile-bar-price-wrap">
          <span className="mobile-bar-lbl">মূল্য:</span>
          <span className="mobile-bar-price">৳ {product.price.toLocaleString('en-US')}</span>
        </div>
        <div className="mobile-bar-btns">
          <button 
            type="button"
            className="mobile-bar-btn-bag"
            onClick={handleAddToCart}
            aria-label="Add to Bag"
          >
            <ShoppingBag size={16} />
          </button>
          <button 
            type="button"
            className="mobile-bar-btn-buy"
            onClick={handleBuyNow}
            aria-label="Order Now"
          >
            <Zap size={16} />
            <span>অর্ডার করুন</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
