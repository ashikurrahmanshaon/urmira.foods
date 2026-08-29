import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Share2, Tag, ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import SEO from '../components/SEO';

function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, setIsCartDrawerOpen } = useCart();

  const post = blogPosts.find((p) => p.id === parseInt(id, 10)) || blogPosts[0];
  const relatedProduct = products.find((p) => p.id === post.relatedProductId) || products[0];

  const handleBuyRelated = () => {
    if (relatedProduct) {
      addToCart(relatedProduct, 1);
      setIsCartDrawerOpen(true);
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": [
      `https://urmira.com${post.image}`
    ],
    "datePublished": "2026-08-28T08:00:00+06:00",
    "dateModified": "2026-08-29T10:00:00+06:00",
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "URMIRA Organic Foods",
      "logo": {
        "@type": "ImageObject",
        "url": "https://urmira.com/favicon.svg"
      }
    },
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://urmira.com/blog/${post.id}`
    }
  };

  return (
    <div className="blog-post-page-wrap">
      <SEO 
        title={post.title}
        description={post.excerpt}
        keywords={post.tags.join(', ') + ', গাওয়া ঘি, organic foods'}
        canonicalPath={`/blog/${post.id}`}
        image={post.image}
        type="article"
        schema={articleSchema}
      />
      <div className="container">
        {/* Navigation Breadcrumb Bar */}
        <div className="post-nav-bar">
          <button 
            type="button" 
            className="post-back-btn" 
            onClick={() => navigate('/blog')}
          >
            <ArrowLeft size={16} />
            <span>ব্লগ তালিকায় ফিরে যান</span>
          </button>

          <span className="post-category-badge">{post.category}</span>
        </div>

        {/* Article Container */}
        <article className="post-main-container">
          {/* Header */}
          <header className="post-header-area">
            <h1 className="post-main-heading">
              {post.title}
            </h1>
            <p className="post-english-subtitle">
              {post.englishTitle}
            </p>

            <div className="post-meta-details-bar">
              <div className="post-author-chip">
                <User size={14} />
                <span>{post.author}</span>
              </div>
              <div className="post-meta-item">
                <Calendar size={14} />
                <span>{post.date}</span>
              </div>
              <div className="post-meta-item">
                <Clock size={14} />
                <span>{post.readTime}</span>
              </div>
            </div>
          </header>

          {/* Master Cover Photo */}
          <div className="post-featured-image-frame">
            <img 
              src={post.image} 
              alt={post.title} 
              className="post-cover-img"
            />
          </div>

          {/* Excerpt Lead Box */}
          <div className="post-lead-summary-box">
            <p className="post-lead-text">
              {post.excerpt}
            </p>
          </div>

          {/* Article Structured Body Content */}
          <div className="post-body-content">
            {post.content.map((sec, idx) => (
              <section key={idx} className="post-content-section">
                <h2 className="post-section-h2">{sec.heading}</h2>
                <p className="post-section-p">{sec.body}</p>
              </section>
            ))}
          </div>

          {/* Related Product High-Conversion CTA Card */}
          {relatedProduct && (
            <div className="post-product-cta-card">
              <div className="post-product-cta-left">
                <img 
                  src={relatedProduct.image} 
                  alt={relatedProduct.name} 
                  className="post-product-cta-thumb"
                />
                <div>
                  <span className="post-product-cta-tag">প্রস্তাবিত প্রাকৃতিক পণ্য</span>
                  <h3 className="post-product-cta-name">{relatedProduct.name}</h3>
                  <div className="post-product-cta-price">৳ {relatedProduct.price.toLocaleString('en-US')}</div>
                </div>
              </div>

              <div className="post-product-cta-actions">
                <Link to={`/product/${relatedProduct.id}`} className="btn btn-outline-green">
                  <span>বিস্তারিত দেখুন</span>
                </Link>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={handleBuyRelated}
                >
                  <ShoppingBag size={15} />
                  <span>অর্ডার করুন</span>
                </button>
              </div>
            </div>
          )}

          {/* Post Tags & Footer */}
          <footer className="post-footer-tags-bar">
            <div className="post-tags-group">
              <Tag size={15} color="#10b981" />
              {post.tags.map((t) => (
                <span key={t} className="post-tag-item">#{t}</span>
              ))}
            </div>

            <Link to="/blog" className="post-explore-more-link">
              <span>অন্যান্য স্বাস্থ্য আর্টিকেল পড়ুন</span>
              <ArrowRight size={14} />
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

export default BlogPost;
