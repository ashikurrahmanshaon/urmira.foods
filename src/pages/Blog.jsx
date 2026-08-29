import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Clock, Calendar, ArrowRight, BookOpen, ShieldCheck, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import SEO from '../components/SEO';

function Blog() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Nutrition & Health', 'Superfoods', 'Food Purity'];

  const filteredPosts = activeCategory === 'ALL'
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "URMIRA Health & Nutrition Journal",
    "description": "প্রাকৃতিক খাবার, খাঁটি গাওয়া ঘিয়ের বিজ্ঞানসম্মত উপকারিতা ও স্বাস্থ্য টিপস।",
    "url": "https://urmira.com/blog",
    "blogPost": blogPosts.map((post) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "url": `https://urmira.com/blog/${post.id}`,
      "datePublished": "2026-08-28",
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <div className="blog-page-wrap">
      <SEO 
        title="স্বাস্থ্য ও পুষ্টি ব্লগ | খাঁটি গাওয়া ঘি ও স্বাস্থ্য টিপস"
        description="গাওয়া ঘি খাওয়ার উপকারিতা, আসল ঘি চেনার সহজ উপায় এবং পুষ্টিকর সুপারফুড নিয়ে তথ্যবহুল স্বাস্থ্য জার্নাল ও গবেষণা টিপস।"
        keywords="গাওয়া ঘি এর উপকারিতা, খাঁটি ঘি চেনার উপায়, pure ghee health benefits, organic food blog bangladesh, khurjur power bomb recipe"
        canonicalPath="/blog"
        schema={blogSchema}
      />
      {/* Blog Hero Header */}
      <section className="blog-hero-section">
        <div className="container">
          <div className="blog-hero-content">
            <span className="blog-hero-badge">
              <BookOpen size={13} className="text-amber-500" />
              <span>URMIRA HEALTH & WELLNESS JOURNAL</span>
            </span>
            <h1 className="blog-hero-title">
              খাদ্য, পুষ্টি ও সুস্থ জীবনের <span>খাঁটি তথ্যকোষ</span>
            </h1>
            <p className="blog-hero-lead">
              প্রাকৃতিক খাবার, ঘিয়ের বিজ্ঞানসম্মত স্বাস্থ্য উপকারিতা এবং পুষ্টিকর সুপারফুড নিয়ে আমাদের বিশেষজ্ঞদের নিয়মিত গবেষণা ও স্বাস্থ্য টিপস।
            </p>

            {/* Category Filter Pills */}
            <div className="blog-category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`blog-category-btn ${activeCategory === cat ? 'active-cat' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === 'ALL' ? 'সকল আর্টিকেল' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-grid-section">
        <div className="container">
          <div className="blog-articles-grid">
            {filteredPosts.map((post) => (
              <article key={post.id} className="blog-card-luxury">
                <Link to={`/blog/${post.id}`} className="blog-card-media-link">
                  <div className="blog-card-image-box">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="blog-card-img"
                      loading="lazy"
                    />
                    <div className="blog-category-tag">
                      <span>{post.category}</span>
                    </div>
                  </div>
                </Link>

                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span className="blog-meta-item">
                      <Calendar size={12} />
                      <span>{post.date}</span>
                    </span>
                    <span className="blog-meta-dot">•</span>
                    <span className="blog-meta-item">
                      <Clock size={12} />
                      <span>{post.readTime}</span>
                    </span>
                  </div>

                  <h2 className="blog-card-title">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>

                  <p className="blog-card-excerpt">
                    {post.excerpt}
                  </p>

                  <div className="blog-card-footer">
                    <div className="blog-tags-list">
                      {post.tags.slice(0, 2).map((t) => (
                        <span key={t} className="blog-tag-pill">#{t}</span>
                      ))}
                    </div>

                    <Link to={`/blog/${post.id}`} className="blog-read-more-btn">
                      <span>পড়ুন</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Trust Banner */}
      <section className="blog-trust-banner">
        <div className="container">
          <div className="blog-trust-box">
            <ShieldCheck size={28} color="#10b981" />
            <div>
              <h3 className="blog-trust-box-title">আমাদের প্রতিশ্রুতি</h3>
              <p className="blog-trust-box-desc">
                প্রতিটি আর্টিকেল বৈজ্ঞানিক রেফারেন্স ও ঐতিহ্যবাহী পুষ্টিজ্ঞানের সমন্বয়ে স্বাস্থ্য সচেতন গ্রাহকদের জন্য তথ্যবহুল ও যাচাইকৃত।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Blog;
