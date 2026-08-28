import { useLocation, Link } from 'react-router-dom';
import { Leaf, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

function Shop() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchFilter = searchParams.get('search') || '';

  const filteredProducts = products.filter((p) => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.shortDesc.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="container" style={{ padding: '2.5rem 1.25rem 5rem' }}>
      <div className="section-header-ios" style={{ marginBottom: '2.5rem' }}>
        <span className="ios-badge">
          <Leaf size={13} />
          <span>আমাদের সকল পণ্য</span>
        </span>
        <h1 className="section-title-ios">
          {searchFilter ? `"${searchFilter}" এর ফলাফল` : 'প্রিমিয়াম অর্গানিক কালেকশন'}
        </h1>
        <p className="section-sub-ios">
          সুস্থ ও কর্মময় জীবনের জন্য ১০০% খাঁটি ও প্রাকৃতিক উপাদান।
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid-two">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
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
    </div>
  );
}

export default Shop;
