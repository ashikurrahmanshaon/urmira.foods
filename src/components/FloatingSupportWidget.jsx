import { useState, useEffect } from 'react';
import { X, ChevronUp, PhoneCall, MessageCircle, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import {
  HotlineIllustration,
  WhatsAppConciergeIllustration,
  NaturalLeafIllustration
} from './Illustrations';

function FloatingSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent('আসসালামু আলাইকুম, আমি উর্মিরা ফুডস থেকে প্রোডাক্ট অর্ডার বা বিস্তারিত তথ্য জানতে চাচ্ছি।');
    window.open(`https://wa.me/8801712345678?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Mobile Backdrop to click away */}
      {isOpen && (
        <div 
          className="floating-backdrop-scrim"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="floating-support-container no-print">
        {/* Scroll to Top Pill */}
        {showScrollTop && (
          <button 
            type="button" 
            className="btn-scroll-top luxury-scroll-top"
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        )}

        {/* Expanded Luxury Quick Help Card */}
        {isOpen && (
          <div className="floating-help-card-popup luxury-glass-card">
            {/* Card Header */}
            <div className="help-card-header">
              <div className="help-brand-badge-premium">
                <span className="live-status-dot"></span>
                <HotlineIllustration size={15} />
                <span>URMIRA 24/7 SUPPORT</span>
              </div>
              <button 
                type="button" 
                className="help-close-circle-btn" 
                onClick={() => setIsOpen(false)}
                aria-label="Close Support Menu"
              >
                <X size={15} />
              </button>
            </div>

            {/* Card Body */}
            <div className="help-card-body">
              <div className="help-header-title-block">
                <h4 className="help-greeting-title">কীভাবে আপনাকে সাহায্য করতে পারি?</h4>
                <p className="help-greeting-sub">সরাসরি অর্ডার করতে বা যেকোনো তথ্যের জন্য যোগাযোগ করুন:</p>
              </div>

              {/* Action Buttons Stack */}
              <div className="help-actions-stack">
                {/* 1. WhatsApp Luxury Action */}
                <button 
                  type="button" 
                  className="help-action-card-luxury wa-luxury-card"
                  onClick={handleWhatsApp}
                >
                  <div className="help-action-icon-wrapper wa-icon-hub">
                    <WhatsAppConciergeIllustration size={24} />
                    <span className="hub-ping-dot"></span>
                  </div>
                  <div className="help-action-content">
                    <div className="help-action-title-row">
                      <strong className="help-action-headline">WhatsApp এ চ্যাট করুন</strong>
                      <span className="help-action-tag-fast">ইনস্ট্যান্ট</span>
                    </div>
                    <span className="help-action-caption">১ মিনিটে দ্রুত উত্তর পাবেন</span>
                  </div>
                  <div className="help-action-arrow-hub">
                    <ArrowRight size={15} />
                  </div>
                </button>

                {/* 2. Phone Call Luxury Action */}
                <a 
                  href="tel:01712345678" 
                  className="help-action-card-luxury call-luxury-card"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="help-action-icon-wrapper call-icon-hub">
                    <HotlineIllustration size={22} />
                  </div>
                  <div className="help-action-content">
                    <div className="help-action-title-row">
                      <strong className="help-action-headline">সরাসরি কল করুন</strong>
                      <span className="help-action-tag-phone">হটলাইন</span>
                    </div>
                    <span className="help-action-number">01712-345678</span>
                  </div>
                  <div className="help-action-arrow-hub">
                    <PhoneCall size={15} />
                  </div>
                </a>
              </div>
            </div>

            {/* Card Footer */}
            <div className="help-card-footer-luxury">
              <div className="footer-guarantee-pill">
                <NaturalLeafIllustration size={14} />
                <span>১০০% খাঁটি ও নির্ভেজাল খাদ্যপণ্য</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Floating Trigger Button */}
        <button 
          type="button" 
          className={`floating-main-trigger-luxury ${isOpen ? 'active-open-luxury' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Live Customer Support"
          title="URMIRA 24/7 Helpline & WhatsApp Support"
        >
          {!isOpen && <span className="floating-radar-ping"></span>}
          <div className="trigger-icon-hub">
            {isOpen ? (
              <X size={20} className="trigger-x-icon" />
            ) : (
              <WhatsAppConciergeIllustration size={22} className="trigger-wa-icon" />
            )}
          </div>
          <span className="floating-trigger-text">
            {isOpen ? 'বন্ধ করুন' : 'হেল্পলাইন'}
          </span>
        </button>
      </div>
    </>
  );
}

export default FloatingSupportWidget;
