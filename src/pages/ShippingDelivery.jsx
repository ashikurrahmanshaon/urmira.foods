import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import {
  EcoDeliveryIllustration,
  CashOnDeliveryIllustration,
  ArtisanTrustShieldIllustration,
  NaturalLeafIllustration
} from '../components/Illustrations';

function ShippingDelivery() {
  return (
    <div className="policy-page-wrap">
      <SEO 
        title="ডেলিভারি ও শিপিং পলিসি | ক্যাশ অন ডেলিভারি"
        description="উর্মিরা ফুডস ডেলিভারি ও শিপিং পলিসি। ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় ৳৭০ এবং সারাদেশে ২-৩ দিনে ৳১৩০ তে হোম ডেলিভারি। ৳২০০০+ অর্ডারে ফ্রি ডেলিভারি।"
        keywords="urmira shipping policy, cash on delivery bangladesh, ghee home delivery"
        canonicalPath="/shipping-delivery"
      />
      <div className="container policy-container">
        {/* Header */}
        <header className="policy-header">
          <div className="policy-badge-pill">
            <EcoDeliveryIllustration size={18} />
            <span>DELIVERY & SHIPPING INFORMATION</span>
          </div>
          <h1 className="policy-title">
            ডেলিভারি ও শিপিং পলিসি
          </h1>
          <p className="policy-subtitle">
            সারাদেশে দ্রুততম সময়ে ও সর্বোচ্চ স্বাস্থ্যবিধি বজায় রেখে আপনার দোরগোড়ায় পৌঁছে দেওয়া আমাদের প্রতিশ্রুতি।
          </p>
        </header>

        {/* 3-Pillar Timeline Grid */}
        <div className="policy-cards-grid">
          <div className="policy-card-item">
            <div className="policy-icon-hub" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <EcoDeliveryIllustration size={32} />
            </div>
            <h3 className="policy-card-heading">ঢাকার ভেতরে ডেলিভারি</h3>
            <p className="policy-card-text">
              ঢাকা সিটির ভেতরে অর্ডার কনফার্মেশনের <strong>২৪ থেকে ৪৮ ঘণ্টার মধ্যে</strong> হোম ডেলিভারি সম্পন্ন করা হয়।
            </p>
            <div className="policy-highlight-fee">চার্জ: ৳ ৭০</div>
          </div>

          <div className="policy-card-item">
            <div className="policy-icon-hub" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <NaturalLeafIllustration size={32} />
            </div>
            <h3 className="policy-card-heading">ঢাকার বাইরে সারাদেশে</h3>
            <p className="policy-card-text">
              দেশের যেকোনো জেলা ও থানা পর্যায়ে <strong>২ থেকে ৩ কার্যদিবসের মধ্যে</strong> হোম ডেলিভারি প্রদান করা হয়।
            </p>
            <div className="policy-highlight-fee">চার্জ: ৳ ১৩০</div>
          </div>

          <div className="policy-card-item">
            <div className="policy-icon-hub" style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CashOnDeliveryIllustration size={34} />
            </div>
            <h3 className="policy-card-heading">ক্যাশ অন ডেলিভারি (COD)</h3>
            <p className="policy-card-text">
              পার্সেল রিসিভ করার সময় সম্পূর্ণ চেক করে ও নিশ্চিত হয়ে ডেলিভারিম্যানের কাছে মূল্য পরিশোধের সুবিধা।
            </p>
            <div className="policy-highlight-fee">১০০% ক্যাশ অন ডেলিভারি</div>
          </div>
        </div>

        {/* Packaging Assurance */}
        <div className="policy-deep-info-box">
          <h2 className="policy-info-h2">বিশেষ সুরক্ষিত প্যাকেজিং</h2>
          <p className="policy-info-p">
            আমাদের খাঁটি গাওয়া ঘি ফুড-গ্রেড এয়ারটাইট গ্লাস বয়ামে এবং খেজুরের পাওয়ার বোম্ব ফুড-সেফ সিলড প্যাকের সাথে থ্রি-লেয়ার বাবল র‍্যাপে মোড়ানো থাকে, যাতে ডেলিভারির সময় কোনো প্রকার লিকেজ বা ভেঙে যাওয়ার ঝুঁকি না থাকে।
          </p>

          <div className="policy-points-list">
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>লাইভ ট্র্যাকিং মেসেজ ও এসএমএস আপডেট</span>
            </div>
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>ডেলিভারির আগে কুরিয়ার রাইডারের ফোন কল নিশ্চয়তা</span>
            </div>
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>ড্যামেজ রিপ্লেসমেন্ট গ্যারান্টি (১০০% ফ্রি)</span>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="policy-cta-row">
          <Link to="/shop" className="btn btn-primary">
            <span>প্রোডাক্ট অর্ডার করুন</span>
            <ArrowRight size={16} />
          </Link>
          <Link to="/contact" className="btn btn-outline-green">
            <span>হেল্পলাইন যোগাযোগ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ShippingDelivery;
