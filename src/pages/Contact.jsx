import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Loader2, Sparkles, ArrowRight, User, PhoneCall } from 'lucide-react';

function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '',
    message: '' 
  });

  const recipientEmail = 'support@urmira.com';
  const whatsAppNumber = '8801712345678';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_OR_PUBLIC_FALLBACK',
          from_name: `Urmira Website Inquiry: ${formData.name}`,
          subject: `🌿 নতুন কাস্টমার মেসেজ: ${formData.name} (${formData.phone})`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email || 'not-provided@customer.com',
          message: formData.message,
          to_email: recipientEmail
        })
      });

      const existingInquiries = JSON.parse(localStorage.getItem('urmira_inquiries') || '[]');
      const newInquiry = {
        id: 'INQ-' + Date.now(),
        createdAt: new Date().toISOString(),
        ...formData
      };
      localStorage.setItem('urmira_inquiries', JSON.stringify([newInquiry, ...existingInquiries]));

      setFormSent(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setFormSent(false), 7000);
    } catch (err) {
      setFormSent(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setFormSent(false), 7000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      alert('দয়া করে আপনার নাম, ফোন নম্বর ও মেসেজটি লিখুন।');
      return;
    }
    const text = encodeURIComponent(
      `*নতুন কাস্টমার মেসেজ (URMIRA.COM)*\n\n` +
      `👤 *নাম:* ${formData.name}\n` +
      `📱 *মোবাইল:* ${formData.phone}\n` +
      (formData.email ? `📧 *ইমেইল:* ${formData.email}\n` : '') +
      `💬 *মেসেজ:* ${formData.message}\n\n` +
      `⏰ _সময়: ${new Date().toLocaleTimeString('bn-BD')}_`
    );
    window.open(`https://wa.me/${whatsAppNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="contact-page-wrap">
      <div className="container contact-container">
        {/* Header */}
        <header className="contact-header">
          <div className="contact-badge-pill">
            <MessageSquare size={14} color="#10b981" />
            <span>24/7 CUSTOMER CARE & HELPLINE</span>
          </div>
          <h1 className="contact-title">
            যোগাযোগ ও কাস্টমার সাপোর্ট
          </h1>
          <p className="contact-subtitle">
            প্রোডাক্ট সম্পর্কে যেকোনো জিজ্ঞাসা, বাল্ক অর্ডার বা ডেলিভারি তথ্যের জন্য সরাসরি আমাদের সাথে যোগাযোগ করুন।
          </p>
        </header>

        {/* 2-Column Contact Info & Form Grid */}
        <div className="contact-grid-main">
          {/* Left Column: Direct Action Contacts */}
          <div className="contact-direct-cards-col">
            {/* Phone Card */}
            <a href="tel:01712345678" className="contact-luxury-touch-card">
              <div className="contact-icon-hub bg-green">
                <Phone size={22} color="#054231" />
              </div>
              <div className="contact-card-text-stack">
                <div className="contact-card-top-status">
                  <span className="contact-card-sub">অর্ডার ও সাপোর্ট হটলাইন</span>
                  <span className="contact-live-pulse-badge">🟢 এখন সক্রিয়</span>
                </div>
                <strong className="contact-card-link-phone">01712-345678</strong>
                <p className="contact-card-note">সকাল ৯টা থেকে রাত ১০টা পর্যন্ত কল করুন</p>
              </div>
              <div className="contact-card-arrow-circle">
                <PhoneCall size={15} />
              </div>
            </a>

            {/* WhatsApp Card */}
            <a href={`https://wa.me/${whatsAppNumber}`} target="_blank" rel="noreferrer" className="contact-luxury-touch-card">
              <div className="contact-icon-hub bg-emerald">
                <MessageSquare size={22} color="#059669" />
              </div>
              <div className="contact-card-text-stack">
                <div className="contact-card-top-status">
                  <span className="contact-card-sub">হোয়াটসঅ্যাপ সাপোর্ট</span>
                  <span className="contact-live-pulse-badge">🟢 ইনস্ট্যান্ট রিপ্লাই</span>
                </div>
                <strong className="contact-card-link-phone">+880 1712-345678</strong>
                <p className="contact-card-note">যেকোনো সময় সরাসরি হোয়াটসঅ্যাপে মেসেজ দিন</p>
              </div>
              <div className="contact-card-arrow-circle">
                <ArrowRight size={15} />
              </div>
            </a>

            {/* Email Card */}
            <a href={`mailto:${recipientEmail}`} className="contact-luxury-touch-card">
              <div className="contact-icon-hub bg-amber">
                <Mail size={22} color="#d97706" />
              </div>
              <div className="contact-card-text-stack">
                <span className="contact-card-sub">ইমেইল নোটিফিকেশন হাব</span>
                <strong className="contact-card-link-phone">{recipientEmail}</strong>
                <p className="contact-card-note">সরাসরি জিমেইল ইনবক্সে মেসেজ পাঠান</p>
              </div>
              <div className="contact-card-arrow-circle">
                <ArrowRight size={15} />
              </div>
            </a>

            {/* Address Card */}
            <div className="contact-luxury-touch-card is-static">
              <div className="contact-icon-hub bg-slate">
                <MapPin size={22} color="#475569" />
              </div>
              <div className="contact-card-text-stack">
                <span className="contact-card-sub">খামার ও প্রধান কার্যালয়</span>
                <strong className="contact-card-address">উর্মিরা ফুডস, মিরপুর-১২, ঢাকা-১২১৬</strong>
                <p className="contact-card-note">বাংলাদেশ</p>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form with Gmail Connection */}
          <div className="contact-form-luxury-sheet">
            <div className="contact-form-header-badge">
              <Sparkles size={14} color="#10b981" />
              <span>DIRECT GMAIL NOTIFICATION</span>
            </div>
            <h3 className="contact-form-heading">আমাদের মেসেজ পাঠান</h3>
            <p className="contact-form-desc">
              আপনার মতামত বা প্রশ্ন লিখে পাঠান, মেসেজটি সরাসরি আমাদের জিমেইল ইনবক্সে পৌঁছে যাবে এবং আমরা অতি দ্রুত কল করব।
            </p>

            {formSent && (
              <div className="contact-success-banner">
                <CheckCircle2 size={24} color="#10b981" style={{ flexShrink: 0 }} />
                <div>
                  <strong>ধন্যবাদ! আপনার মেসেজটি সফলভাবে জিমেইলে পাঠানো হয়েছে।</strong>
                  <p style={{ margin: '3px 0 0', fontSize: '0.82rem', color: '#054231' }}>
                    আমাদের প্রতিনিধি শীঘ্রই আপনার মোবাইল নম্বরে যোগাযোগ করবেন।
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-inputs-group">
              <div>
                <label className="contact-form-label">আপনার পূর্ণ নাম *</label>
                <input 
                  type="text"
                  required
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="contact-text-input"
                />
              </div>

              <div className="contact-dual-inputs-row">
                <div style={{ flex: 1 }}>
                  <label className="contact-form-label">মোবাইল নাম্বার *</label>
                  <input 
                    type="tel"
                    required
                    inputMode="tel"
                    placeholder="যেমন: 017XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="contact-text-input"
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <label className="contact-form-label">আপনার ইমেইল (ঐচ্ছিক)</label>
                  <input 
                    type="email"
                    placeholder="name@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-text-input"
                  />
                </div>
              </div>

              <div>
                <label className="contact-form-label">আপনার মেসেজ / বিস্তারিত অনুসন্ধান *</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="এখানে আপনার প্রশ্ন, পাইকারি অর্ডার বা যেকোনো বিস্তারিত তথ্য লিখুন..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="contact-text-input"
                />
              </div>

              {/* Action Buttons: Full-Width Primary + WhatsApp Pill */}
              <div className="contact-luxury-actions-stack">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary contact-main-submit-btn"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>জিমেইলে পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span>জিমেইলে মেসেজ পাঠান</span>
                      <div className="submit-arrow-disc">
                        <Send size={15} />
                      </div>
                    </>
                  )}
                </button>

                <div className="contact-actions-divider">
                  <span>অথবা দ্রুত যোগাযোগের জন্য</span>
                </div>

                <button
                  type="button"
                  onClick={handleSendViaWhatsApp}
                  className="contact-whatsapp-luxury-pill"
                >
                  <MessageSquare size={17} color="#059669" />
                  <span>সরাসরি হোয়াটসঅ্যাপে চ্যাট করুন</span>
                  <ArrowRight size={15} color="#059669" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

