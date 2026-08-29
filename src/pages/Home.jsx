import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  Award, 
  Leaf, 
  Star, 
  ChevronDown, 
  CheckCircle2, 
  HeartHandshake, 
  PhoneCall, 
  Sparkles, 
  Zap,
  Droplet,
  Check
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

function Home() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);
  const [comboAdded, setComboAdded] = useState(false);

  const handleOrderCombo = () => {
    const ghee = products.find((p) => p.id === 1);
    const khejur = products.find((p) => p.id === 2);
    if (ghee && khejur) {
      setComboAdded(true);
      addToCart(ghee, 1, false);
      addToCart(khejur, 1, false);
      setTimeout(() => {
        navigate('/cart');
      }, 350);
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const reviews = [
    {
      name: 'আরিফুল ইসলাম',
      location: 'মিরপুর, ঢাকা',
      rating: 5,
      product: 'প্রিমিয়াম খাঁটি গাওয়া ঘি',
      comment: 'উর্মিরা থেকে ঘি নিয়ে সত্যি মুগ্ধ হয়েছি! এর সুবাস আর দানাদার টেক্সচার মুখে লেগে থাকে। পরিবারের সবাই খুব পছন্দ করেছে।'
    },
    {
      name: 'তানজিলা রহমান',
      location: 'ধানমন্ডি, ঢাকা',
      rating: 5,
      product: 'খেজুরের পাওয়ার বোম্ব',
      comment: 'খেজুরের পাওয়ার বোম্ব সত্যিই দারুণ শক্তি জোগায়। কোনো বাড়তি চিনি ছাড়া প্রিমিয়াম বাদাম ও মধুর এই মিশ্রণটি চমৎকার।'
    },
    {
      name: 'সাইফুল করিম',
      location: 'চট্টগ্রাম সদর',
      rating: 5,
      product: 'গাওয়া ঘি ও পাওয়ার বোম্ব কম্বো',
      comment: 'ডেলিভারি পেয়েছি মাত্র ২ দিনে। পার্সেল খুলে চেক করে টাকা দিতে পেরেছি। খাঁটি জিনিসের জন্য উর্মিরাকে বিশ্বাস করা যায়।'
    }
  ];

  const faqs = [
    {
      q: 'উর্মিরা গাওয়া ঘি কেন অন্যান্য ব্র্যান্ড থেকে সেরা?',
      a: 'আমরা খামারিদের খাঁটি গরুর দুধের ননী ও মাখন সংগ্রহ করে সম্পূর্ণ ঐতিহ্যবাহী ও প্রাকৃতিক স্বাস্থ্যসম্মত পদ্ধতিতে ঘি তৈরি করি। কোনো প্রকার ডালডা, কৃত্রিম সুগন্ধি বা রাসায়নিক প্রিজারভেটিভ ব্যবহার করা হয় না।'
    },
    {
      q: 'খেজুরের পাওয়ার বোম্বে কী কী উপাদান রয়েছে?',
      a: 'এতে রয়েছে প্রিমিয়াম কোয়ালিটির আজওয়া ও মরিয়ম খেজুর, খাঁটি প্রাকৃতিক মধু, কাজুবাদাম, কাঠবাদাম, পেস্তা বাদাম, আখরোট এবং শক্তিদায়ী বিভিন্ন প্রাকৃতিক পুষ্টিকর বীজ।'
    },
    {
      q: 'ডেলিভারি চার্জ কত এবং ডেলিভারি পেতে কত সময় লাগে?',
      a: 'ঢাকার ভেতরে হোম ডেলিভারি চার্জ মাত্র ৳৭০ (১-২ দিনের মধ্যে) এবং ঢাকার বাইরে সারাদেশে ৳১৩০ (২-৩ দিনের মধ্যে)। ৳২০০০ টাকার অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি! এছাড়া পার্সেল হাতে পেয়ে চেক করে নেওয়ার শতভাগ সুবিধা রয়েছে।'
    },
    {
      q: 'আমি কীভাবে সরাসরি বা ফোনে অর্ডার করতে পারি?',
      a: 'আপনি ওয়েবসাইটে প্রোডাক্ট সিলেক্ট করে সরাসরি "অর্ডার করুন" বাটনে চাপ দিতে পারেন অথবা আমাদের হেল্পলাইনে সরাসরি কল করতে পারেন: 01712-345678।'
    }
  ];

  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://urmira.com/#website",
        "url": "https://urmira.com/",
        "name": "URMIRA - 100% Pure Organic Foods",
        "description": "১০০% খাঁটি গাওয়া ঘি এবং স্পেশাল খেজুরের পাওয়ার বোম্ব",
        "publisher": {
          "@type": "Organization",
          "name": "URMIRA Organic Foods"
        }
      },
      {
        "@type": "Store",
        "@id": "https://urmira.com/#store",
        "name": "URMIRA Foods Store",
        "image": "https://urmira.com/images/ghee-1.jpg",
        "telephone": "+8801712345678",
        "priceRange": "৳ 850 - ৳ 1950",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dhaka",
          "addressCountry": "BD"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://urmira.com/#faq",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
          }
        }))
      }
    ]
  };

  return (
    <div>
      <SEO 
        title="খাঁটি গাওয়া ঘি ও খেজুরের পাওয়ার বোম্ব | URMIRA Organic Foods"
        description="উর্মিরা ফুডস - ১০০% প্রাকৃতিক ও খাঁটি গাওয়া ঘি এবং প্রিমিয়াম খেজুরের পাওয়ার বোম্ব। কোনো প্রকার কেমিক্যাল বা কৃত্রিম ফ্লেভার ছাড়া শতভাগ প্রাকৃতিক। সারাদেশে ক্যাশ অন ডেলিভারি।"
        keywords="গাওয়া ঘি, খাঁটি গাওয়া ঘি, pure cow ghee bd, gawa ghee price in bangladesh, buy organic cow ghee, pure ghee online, খাঁটি ঘি চেনার উপায়, খেজুরের পাওয়ার বোম্ব, khurjur power bomb, dry fruits honey, organic food bangladesh, urmira foods"
        canonicalPath="/"
        image="/images/ghee-1.jpg"
        schema={homeSchema}
      />
      {/* 1. Pure & Authentic Luxury Hero Section */}
      <section className="hero-ios-wrap">
        <div className="container">
          <div className="hero-ios-grid">
            {/* Left Content Column */}
            <div className="hero-content-block">
              <div className="hero-badge-capsule">
                <Leaf size={14} className="hero-leaf-spin" />
                <span>১০০% বিশুদ্ধ ও হস্তনির্মিত প্রাকৃতিক খাবার</span>
              </div>

              <h1 className="hero-ios-title">
                খাঁটি ও নির্ভেজাল খাবার, <br />
                <span className="hero-highlight-phrase">আপনার সুস্থতার অঙ্গীকার।</span>
              </h1>

              <p className="hero-ios-lead">
                খামারিদের খাঁটি গরুর দুধের মাখন থেকে তৈরি সুবাসিত গাওয়া ঘি এবং প্রিমিয়াম খেজুর, মধু ও ৫ প্রকার বাদামে প্রস্তুত পুষ্টিকর পাওয়ার বোম্ব। কোনো প্রকার কেমিক্যাল বা কৃত্রিম উপাদান ছাড়া শতভাগ প্রাকৃতিক।
              </p>

              <div className="hero-ios27-actions-row">
                <Link to="/shop" className="ios27-primary-cta">
                  <span className="ios27-cta-text">সব প্রোডাক্ট দেখুন</span>
                  <div className="ios27-cta-arrow-disc">
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </div>
                </Link>
                <Link to="/product/1" className="ios27-secondary-cta">
                  <div className="ios27-cta-icon-disc">
                    <Droplet size={16} color="#d97706" />
                  </div>
                  <span className="ios27-cta-text">খাঁটি গাওয়া ঘি</span>
                </Link>
              </div>

              {/* Authentic Bengali Trust Promises */}
              <div className="hero-ios-trust-capsules">
                <div className="trust-pill-authentic">
                  <Leaf size={15} color="#10b981" />
                  <span>১০০% খাঁটি ও নির্ভেজাল</span>
                </div>
                <div className="trust-pill-authentic">
                  <Award size={15} color="#10b981" />
                  <span>খামারিদের মাখনে প্রস্তুত</span>
                </div>
                <div className="trust-pill-authentic">
                  <Truck size={15} color="#10b981" />
                  <span>ক্যাশ অন ডেলিভারি (চেক করে পেমেন্ট)</span>
                </div>
              </div>
            </div>

            {/* Right: High-Impact Duo Mega Combo Card */}
            <div>
              <div className="hero-combo-luxury-card">
                {/* Big Studio Duo Showcase Frame */}
                <div className="hero-combo-duo-stage">
                  <div className="hero-combo-photo-box box-ghee">
                    <img 
                      src="/images/ghee-1.jpg" 
                      alt="Pure Cow Ghee" 
                      className="combo-stage-img"
                      loading="eager"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/ghee-1.jpg';
                      }}
                    />
                    <div className="combo-item-chip">
                      <span>খাঁটি গাওয়া ঘি (৫০০ গ্রাম)</span>
                    </div>
                  </div>

                  <div className="combo-plus-separator">
                    <span>+</span>
                  </div>

                  <div className="hero-combo-photo-box box-khejur">
                    <img 
                      src="/images/khejur-1.jpg" 
                      alt="Khurjur Power Bomb" 
                      className="combo-stage-img"
                      loading="eager"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/khejur-1.jpg';
                      }}
                    />
                    <div className="combo-item-chip">
                      <span>পাওয়ার বোম্ব (৫০০ গ্রাম)</span>
                    </div>
                  </div>
                </div>

                {/* Combo Info & Pricing Body */}
                <div className="hero-combo-content-body">
                  <div className="combo-title-area">
                    <div className="combo-title-badge-row">
                      <strong className="combo-main-title">গাওয়া ঘি ও পাওয়ার বোম্ব মেগা কম্বো</strong>
                      <span className="combo-save-pill">SAVE ৳ ৪৪০</span>
                    </div>
                    <p className="combo-sub-caption">100% Pure Cow Ghee (500g) + Khurjur Power Bomb (500g)</p>
                  </div>

                  <div className="combo-action-footer-row">
                    <div className="combo-price-group">
                      <span className="combo-price-current">৳ ১,৯৫০</span>
                      <span className="combo-price-mrp">৳ ২,৩৯০</span>
                    </div>

                    <button 
                      type="button" 
                      className="ios27-combo-pill-btn"
                      onClick={handleOrderCombo}
                      aria-label="Order Duo Combo"
                    >
                      <span className="ios27-combo-btn-text">
                        {comboAdded ? 'Adding...' : 'Order Combo'}
                      </span>
                      <div className="ios27-combo-arrow-disk">
                        {comboAdded ? <Check size={15} strokeWidth={2.5} /> : <ArrowRight size={15} strokeWidth={2.5} />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Iconic iOS Trust Metrics Section */}
      <section className="stats-strip-wrap">
        <div className="container">
          <div className="stats-grid-four">
            {/* Metric 1 */}
            <div className="stat-card-luxury">
              <div className="stat-icon-hub icon-hub-emerald">
                <HeartHandshake size={20} color="#054231" />
              </div>
              <div className="stat-text-stack">
                <div className="stat-number">৫,০০০+</div>
                <div className="stat-label">সন্তুষ্ট পরিবার</div>
                <span className="stat-micro-pill">Happy Families</span>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="stat-card-luxury">
              <div className="stat-icon-hub icon-hub-green">
                <Leaf size={20} color="#10b981" />
              </div>
              <div className="stat-text-stack">
                <div className="stat-number">১০০%</div>
                <div className="stat-label">খাঁটি ও নির্ভেজাল</div>
                <span className="stat-micro-pill">Pure Organic</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="stat-card-luxury">
              <div className="stat-icon-hub icon-hub-teal">
                <Truck size={20} color="#054231" />
              </div>
              <div className="stat-text-stack">
                <div className="stat-number">৬৪ জেলায়</div>
                <div className="stat-label">হোম ডেলিভারি</div>
                <span className="stat-micro-pill">Nationwide COD</span>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="stat-card-luxury">
              <div className="stat-icon-hub icon-hub-gold">
                <Star size={20} color="#d97706" />
              </div>
              <div className="stat-text-stack">
                <div className="stat-number">৪.৯ ★</div>
                <div className="stat-label">কাস্টমার রেটিং</div>
                <span className="stat-micro-pill">Top Rated Store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Products Section */}
      <section className="section-ios-wrap" id="products">
        <div className="container">
          <div className="section-header-ios">
            <span className="ios-badge-animated">
              <Leaf size={14} className="badge-leaf-pulse" />
              <span>আমাদের স্পেশাল কালেকশন</span>
            </span>
            <h2 className="section-title-ios">প্রিমিয়াম অর্গানিক পণ্য</h2>
            <p className="section-sub-ios">
              স্বাস্থ্যকর জীবনযাপনে সম্পূর্ণ প্রাকৃতিকভাবে তৈরি সেরা দুইটি খাদ্যপণ্য।
            </p>
          </div>

          <div className="product-grid-two">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pure Ingredients Deep Dive Showcase */}
      <section className="section-ios-wrap ingredients-deep-section">
        <div className="container">
          <div className="section-header-ios">
            <span className="ios-badge">
              <Sparkles size={12} />
              <span>খাঁটি উপাদানের প্রতিশ্রুতি</span>
            </span>
            <h2 className="section-title-ios">আমাদের খাবারে কী রয়েছে?</h2>
            <p className="section-sub-ios">
              কোনো ক্ষতিকর প্রিজারভেটিভ বা কেমিক্যাল ছাড়া শতভাগ প্রাকৃতিক উপকরণের সমাহার।
            </p>
          </div>

          <div className="ingredients-duo-cards">
            {/* Ghee Card */}
            <div className="ingredient-card-item">
              <div className="ingredient-card-header">
                <div className="ingredient-badge-disc ghee-disc">
                  <Droplet size={18} />
                </div>
                <div>
                  <h3 className="ingredient-title">প্রিমিয়াম খাঁটি গাওয়া ঘি</h3>
                  <span className="ingredient-subtitle">Artisan Pure Cow Ghee</span>
                </div>
              </div>
              <p className="ingredient-desc">
                গ্রামের বিশ্বস্ত খামারিদের থেকে সংগৃহীত খাঁটি দুধের ননী মন্থন করে ধীর আঁচে প্রস্তুতকৃত দানাদার সুবাসিত ঘি।
              </p>
              <ul className="ingredient-checklist">
                <li><CheckCircle2 size={15} color="#10b981" /> ১০০% গরুর দুধের মাখন থেকে তৈরি</li>
                <li><CheckCircle2 size={15} color="#10b981" /> প্রাকৃতিক সুবাস ও খাঁটি দানাদার টেক্সচার</li>
                <li><CheckCircle2 size={15} color="#10b981" /> কোনো প্রকার ডালডা বা কৃত্রিম সেন্ট নেই</li>
              </ul>
              <Link to="/product/1" className="btn btn-outline-green btn-full-card">
                <span>ঘি সম্পর্কে বিস্তারিত দেখুন</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Power Bomb Card */}
            <div className="ingredient-card-item">
              <div className="ingredient-card-header">
                <div className="ingredient-badge-disc khejur-disc">
                  <Zap size={18} />
                </div>
                <div>
                  <h3 className="ingredient-title">খেজুরের পাওয়ার বোম্ব</h3>
                  <span className="ingredient-subtitle">Khurjur & Nuts Energy Bomb</span>
                </div>
              </div>
              <p className="ingredient-desc">
                মরিয়ম ও আজওয়া খেজুর, খাঁটি মধু এবং কাজু, কাঠবাদাম, পেস্তা, আখরোট ও শক্তিদায়ী বীজের রাজকীয় ফর্মুলা।
              </p>
              <ul className="ingredient-checklist">
                <li><CheckCircle2 size={15} color="#10b981" /> ৫ প্রকার প্রিমিয়াম বাদাম ও খাঁটি প্রাকৃতিক মধু</li>
                <li><CheckCircle2 size={15} color="#10b981" /> কোনো চিনি বা আর্টিফিশিয়াল সুইটনার নেই</li>
                <li><CheckCircle2 size={15} color="#10b981" /> সারাদিনের কর্মশক্তি ও শারীরিক সুস্থতার সেরা উৎস</li>
              </ul>
              <Link to="/product/2" className="btn btn-outline-green btn-full-card">
                <span>পাওয়ার বোম্ব বিস্তারিত দেখুন</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Urmira (Value Pillars) */}
      <section className="pillars-ios-wrap">
        <div className="container">
          <div className="section-header-ios">
            <span className="ios-badge">
              <ShieldCheck size={12} />
              <span>বিশ্বস্ততার অঙ্গীকার</span>
            </span>
            <h2 className="section-title-ios">কেন উর্মিরা সেরা?</h2>
            <p className="section-sub-ios">আমরা আপসহীন কোয়ালিটি ও গ্রাহকের সন্তুষ্টিতে বিশ্বাসী।</p>
          </div>

          <div className="pillars-grid-three">
            <div className="ios-pillar-card">
              <div className="ios-pillar-icon icon-fresh">
                <Leaf size={24} />
              </div>
              <h3 className="ios-pillar-title">১০০% অর্গানিক ও ফ্রেশ</h3>
              <p className="ios-pillar-desc">
                গ্রামের নির্ভরযোগ্য খামারিদের থেকে সরাসরি সংগৃহীত উপাদান। কোনো প্রিজারভেটিভ, ডালডা বা কৃত্রিম ফ্লেভার নেই।
              </p>
              <div className="pillar-authentic-tag">
                <span>✓ ১০০% ন্যাচারাল উপাদান</span>
              </div>
            </div>

            <div className="ios-pillar-card highlight-pillar">
              <div className="ios-pillar-icon icon-pure">
                <ShieldCheck size={24} />
              </div>
              <h3 className="ios-pillar-title">হস্তনির্মিত খাঁটি প্রস্তুত প্রণালী</h3>
              <p className="ios-pillar-desc">
                ঐতিহ্যবাহী ও স্বাস্থ্যসম্মত প্রাকৃতিক পদ্ধতিতে তৈরি। কোনো প্রকার ক্ষতিকারক কেমিক্যাল বা কৃত্রিম রঙ ছাড়া শতভাগ খাঁটি।
              </p>
              <div className="pillar-authentic-tag">
                <span>✓ প্রিমিয়াম কোয়ালিটি পরীক্ষিত</span>
              </div>
            </div>

            <div className="ios-pillar-card">
              <div className="ios-pillar-icon icon-delivery">
                <Truck size={24} />
              </div>
              <h3 className="ios-pillar-title">দ্রুত ক্যাশ অন ডেলিভারি</h3>
              <p className="ios-pillar-desc">
                সারাদেশে দ্রুততম সময়ে আপনার ঠিকানায় ডেলিভারি। পার্সেল দেখে ও যাচাই করে মূল্য পরিশোধের নিশ্চয়তা।
              </p>
              <div className="pillar-authentic-tag">
                <span>✓ চেক করে পেমেন্ট সুবিধা</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Customer Testimonials Section */}
      <section className="section-ios-wrap testimonials-section-wrap">
        <div className="container">
          <div className="section-header-ios">
            <span className="ios-badge">
              <Star size={12} />
              <span>গ্রাহকদের মতামত</span>
            </span>
            <h2 className="section-title-ios">গ্রাহকরা কী বলছেন?</h2>
            <p className="section-sub-ios">আমাদের সম্মানিত ক্রেতাদের কিছু বাস্তব অভিজ্ঞতা ও রিভিউ।</p>
          </div>

          <div className="reviews-grid-three">
            {reviews.map((rev, index) => (
              <div key={index} className="review-card-item">
                <div className="review-stars-row">
                  <div className="stars-cluster">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="#d97706" color="#d97706" />
                    ))}
                  </div>
                  <span className="review-verified-tag">
                    <CheckCircle2 size={12} color="#10b981" /> ভেরিফাইড ক্রেতা
                  </span>
                </div>

                <p className="review-comment-text">"{rev.comment}"</p>

                <div className="review-author-meta">
                  <div className="author-avatar-initial">
                    {rev.name[0]}
                  </div>
                  <div>
                    <strong className="author-name">{rev.name}</strong>
                    <span className="author-loc">{rev.location} • <em>{rev.product}</em></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Accordion Section */}
      <section className="section-ios-wrap faq-section-wrap">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header-ios">
            <span className="ios-badge">
              <HeartHandshake size={12} />
              <span>সাধারণ জিজ্ঞাসা</span>
            </span>
            <h2 className="section-title-ios">সচরাচর জানতে চাওয়া প্রশ্ন</h2>
            <p className="section-sub-ios">আপনার সুবিধার্থে গুরুত্বপূর্ণ কিছু প্রশ্নের উত্তর নিচে দেওয়া হলো।</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item-card ${openFaq === index ? 'active' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <span className="faq-q-text">{faq.q}</span>
                  <div className={`faq-chevron-circle ${openFaq === index ? 'rotated' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </div>
                {openFaq === index && (
                  <div className="faq-answer-block">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Helpline Banner */}
          <div className="faq-helpline-card">
            <div>
              <h4 className="helpline-card-h4">
                অন্য কোনো প্রশ্ন বা সরাসরি অর্ডার করতে চান?
              </h4>
              <p className="helpline-card-p">আমাদের কাস্টমার কেয়ার টিম সবসময় আপনার সেবায় প্রস্তুত।</p>
            </div>
            <a href="tel:01712345678" className="btn btn-primary helpline-cta-btn">
              <PhoneCall size={16} />
              <span>কল করুন: 01712-345678</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
