import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SEO from '../components/SEO';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import {
  NaturalLeafIllustration,
  FreeGiftIllustration,
  EcoDeliveryIllustration,
  CashOnDeliveryIllustration,
  ArtisanTrustShieldIllustration
} from '../components/Illustrations';

function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get('search') || '';

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handleOrderCombo = () => {
    const ghee = products.find((p) => p.id === 1);
    const khejur = products.find((p) => p.id === 2);
    if (ghee && khejur) {
      addToCart(ghee, 1, false);
      addToCart(khejur, 1, false);
      navigate('/cart');
    }
  };

  const shopSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "URMIRA Organic Products",
    "itemListElement": products.map((prod, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": prod.name,
      "url": `https://urmira.com/product/${prod.id}`
    }))
  };

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
      <SEO 
        title={searchFilter ? `"${searchFilter}" সার্চ রেজাল্ট | শপ` : 'সকল প্রিমিয়াম পণ্য | খাঁটি গাওয়া ঘি ও খেজুর পাওয়ার বোম্ব'}
        description="উর্মিরা ফুডস শপ - প্রিমিয়াম কোয়ালিটির খাঁটি গাওয়া ঘি (Pure Cow Ghee) এবং স্পেশাল খেজুরের পাওয়ার বোম্ব (Khurjur Power Bomb)। ১০০% বিশুদ্ধ ও প্রাকৃতিক।"
        keywords="গাওয়া ঘি কিনুন, খাঁটি গাওয়া ঘি অর্ডার, pure cow ghee buy bd, gawa ghee 500g, power bomb khejur, organic ghee shop"
        canonicalPath="/shop"
        schema={shopSchema}
      />
      {/* Header */}
      <div className="section-header-ios" style={{ marginBottom: '2.25rem' }}>
        <span className="ios-badge">
          <NaturalLeafIllustration size={15} />
          <span>আমাদের সকল পণ্য</span>
        </span>
        <h1 className="section-title-ios">
          {searchFilter ? `"${searchFilter}" এর ফলাফল` : 'প্রিমিয়াম অর্গানিক কালেকশন'}
        </h1>
        <p className="section-sub-ios">
          সুস্থ ও কর্মময় জীবনের জন্য ১০০% খাঁটি, প্রাকৃতিক ও পুষ্টিকর উপাদান।
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="product-grid-two">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mega Duo Combo Banner in Shop */}
          <div className="shop-combo-callout-card">
            <div className="shop-combo-left">
              <span className="shop-combo-tag">
                <FreeGiftIllustration size={14} />
                <span>মেগা সেভিংস অফার</span>
              </span>
              <h2 className="shop-combo-title">গাওয়া ঘি ও পাওয়ার বোম্ব মেগা কম্বো</h2>
              <p className="shop-combo-desc">
                ১০০% খাঁটি গাওয়া ঘি (৫০০ গ্রাম) + খেজুরের পাওয়ার বোম্ব (৫০০ গ্রাম) একসাথে অর্ডার করে উপভোগ করুন ৪৪০ টাকা ছাড় ও ফ্রি ডেলিভারি!
              </p>
              <div className="shop-combo-price-line">
                <span className="shop-combo-price">৳ ১,৯৫০</span>
                <span className="shop-combo-old">৳ ২,৩৯০</span>
                <span className="shop-combo-save-badge">SAVE ৳ ৪৪০</span>
              </div>
            </div>

            <div className="shop-combo-right">
              <button 
                type="button" 
                className="btn btn-primary shop-combo-btn"
                onClick={handleOrderCombo}
              >
                <span>অর্ডার কম্বো প্যাক</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#ffffff', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f5f5f7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <ShoppingBag size={24} color="#86868b" />
          </div>
          <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#054231' }}>কোনো পণ্য পাওয়া যায়নি</h3>
          <p style={{ color: '#6e6e73', marginTop: '0.35rem', fontSize: '0.92rem' }}>দয়া করে ঘি অথবা পাওয়ার বোম্ব লিখে পুনরায় চেষ্টা করুন।</p>
          <Link to="/shop" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            সব পণ্য দেখুন
          </Link>
        </div>
      )}

      {/* Trust Badges Bar */}
      <div className="shop-trust-strip">
        <div className="shop-trust-item">
          <NaturalLeafIllustration size={20} />
          <span>১০০% অর্গানিক ও ফ্রেশ</span>
        </div>
        <div className="shop-trust-item">
          <EcoDeliveryIllustration size={20} />
          <span>সারাদেশে ক্যাশ অন ডেলিভারি</span>
        </div>
        <div className="shop-trust-item">
          <CashOnDeliveryIllustration size={20} />
          <span>পার্সেল দেখে ও যাচাই করে পেমেন্ট</span>
        </div>
      </div>
    </div>
  );
}

export default Shop;
