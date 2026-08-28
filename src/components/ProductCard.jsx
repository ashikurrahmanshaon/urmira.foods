import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Star, Check, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, true);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, false);
    navigate('/cart');
  };

  const savings = product.oldPrice ? product.oldPrice - product.price : 0;
  const englishBadge = product.id === 1 ? 'BESTSELLER' : 'HOT SELECTION';
  const displayBangla = product.id === 1 ? 'খাঁটি গাওয়া ঘি' : 'খেজুরের পাওয়ার বোম্ব';
  const subtitle = product.id === 1 
    ? '১০০% খাঁটি গরুর দুধের মাখন থেকে তৈরি সুগন্ধি গাওয়া ঘি' 
    : 'প্রিমিয়াম খেজুর, মধু ও ৫ প্রকার বাদামের পুষ্টিকর মিশ্রণ';
  
  // Use high quality authentic photo
  const cardImage = product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';

  return (
    <div className="ios-product-card luxury-card-elevated">
      <Link to={`/product/${product.id}`} className="card-clickable-area">
        {/* Full-Bleed Studio Photo Frame */}
        <div className="ios-card-img-wrap">
          {/* Top Badges */}
          <div className="card-top-badges-row">
            <span className="card-floating-badge-primary">
              <Sparkles size={11} />
              <span>{englishBadge}</span>
            </span>
            
            {savings > 0 && (
              <span className="card-floating-badge-discount">
                SAVE ৳ {savings}
              </span>
            )}
          </div>
          
          {/* Edge-to-Edge High Definition Photo */}
          <img 
            src={cardImage} 
            alt={product.name} 
            className="product-card-real-img"
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = product.id === 1 ? '/images/ghee-1.jpg' : '/images/khejur-1.jpg';
            }}
          />

          {/* Bottom Glass Tag */}
          <div className="card-floating-weight-chip">
            <span>Net: 500g</span>
          </div>
        </div>

        {/* Clean & Elegant Information */}
        <div className="ios-card-body">
          {/* Rating */}
          <div className="ios-rating-row">
            <div className="stars-cluster">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill="#d97706" color="#d97706" />
              ))}
            </div>
            <span className="rating-label-clean">{product.rating} ({product.reviewsCount}+ Reviews)</span>
          </div>

          {/* Product Title */}
          <h3 className="ios-card-title">{displayBangla}</h3>
          
          {/* Short Subtitle */}
          <p className="ios-card-subtitle">{subtitle}</p>

          {/* Single-Line Price Row */}
          <div className="ios-card-price-row">
            <span className="ios-price-current">৳ {product.price.toLocaleString('en-US')}</span>
            {product.oldPrice && (
              <span className="ios-price-old">৳ {product.oldPrice.toLocaleString('en-US')}</span>
            )}
          </div>
        </div>
      </Link>

      {/* Clean Dual Action Buttons */}
      <div className="card-dual-actions">
        <button 
          className={`btn card-btn-bag ${added ? 'btn-bag-added' : 'btn-bag-normal'}`}
          onClick={handleAddToCart}
          aria-label="Add to Bag"
        >
          {added ? (
            <>
              <Check size={16} color="#054231" />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Bag</span>
            </>
          )}
        </button>

        <button 
          className="btn btn-primary card-btn-buy"
          onClick={handleBuyNow}
          aria-label="Order Now"
        >
          <Zap size={16} />
          <span>Order Now</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
