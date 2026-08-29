import { useState } from 'react';
import { Phone, MessageCircle, X, Headphones, Sparkles, ChevronUp } from 'lucide-react';

function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back to top button
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    }, { passive: true });
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('আসসালামু আলাইকুম, আমি উর্মিরা ফুডস থেকে প্রোডাক্ট অর্ডার বা তথ্য জানতে চাচ্ছি।');
    window.open(`https://wa.me/8801712345678?text=${text}`, '_blank');
  };

  return (
    <div className="floating-support-container no-print">
      {/* Scroll to Top Pill */}
      {showScrollTop && (
        <button 
          type="button"
          className="btn-scroll-top"
          onClick={handleScrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp size={18} />
        </button>
      )}

      {/* Expanded Quick Help Card */}
      {isOpen && (
        <div className="floating-help-card-popup">
          <div className="help-card-header">
            <div className="help-brand-badge">
              <Headphones size={15} color="#10b981" />
              <span>URMIRA 24/7 SUPPORT</span>
            </div>
            <button 
              type="button" 
              className="help-close-btn" 
              onClick={() => setIsOpen(false)}
              aria-label="Close Support Menu"
            >
              <X size={16} />
            </button>
          </div>

          <div className="help-card-body">
            <h4 className="help-greeting-title">কীভাবে আপনাকে সাহায্য করতে পারি?</h4>
            <p className="help-greeting-sub">সরাসরি অর্ডার করতে বা যেকোনো তথ্যের জন্য যোগাযোগ করুন:</p>

            <div className="help-actions-stack">
              <button 
                type="button" 
                className="help-action-btn btn-wa-chat"
                onClick={handleWhatsApp}
              >
                <div className="help-action-icon-disc wa-disc">
                  <MessageCircle size={17} />
                </div>
                <div className="help-action-text-group">
                  <span className="help-action-main">WhatsApp এ চ্যাট করুন</span>
                  <span className="help-action-sub">তাৎক্ষণিক উত্তর পাবেন</span>
                </div>
              </button>

              <a 
                href="tel:01712345678" 
                className="help-action-btn btn-call-now"
                onClick={() => setIsOpen(false)}
              >
                <div className="help-action-icon-disc call-disc">
                  <Phone size={17} />
                </div>
                <div className="help-action-text-group">
                  <span className="help-action-main">সরাসরি কল করুন</span>
                  <span className="help-action-sub">01712-345678</span>
                </div>
              </a>
            </div>
          </div>

          <div className="help-card-footer">
            <Sparkles size={12} color="#10b981" />
            <span>১০০% খাঁটি ও নির্ভেজাল খাদ্যপণ্য</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button 
        type="button" 
        className={`floating-main-trigger ${isOpen ? 'active-open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Live Customer Support"
      >
        <span className="floating-badge-ping"></span>
        <div className="trigger-icon-swap">
          {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        </div>
        <span className="floating-trigger-label">হেল্পলাইন</span>
      </button>
    </div>
  );
}

export default FloatingSupportWidget;
