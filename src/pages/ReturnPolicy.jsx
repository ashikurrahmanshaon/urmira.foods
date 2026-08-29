import { Link } from 'react-router-dom';
import { RotateCcw, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

function ReturnPolicy() {
  return (
    <div className="policy-page-wrap">
      <SEO 
        title="রিটার্ন ও রিফান্ড পলিসি | ১০০% সন্তুষ্টির নিশ্চয়তা"
        description="উর্মিরা ফুডস রিটার্ন ও রিফান্ড পলিসি। ডেলিভারির সময় পার্সেল চেক করে নেওয়ার সুবিধা এবং ত্রুটিযুক্ত পণ্যের ক্ষেত্রে ২৪ ঘণ্টায় ফ্রি রিটার্ন ও রিফান্ড নিশ্চয়তা।"
        keywords="urmira return policy, refund guarantee, ghee replacement bd"
        canonicalPath="/return-policy"
      />
      <div className="container policy-container">
        {/* Header */}
        <header className="policy-header">
          <div className="policy-badge-pill">
            <RotateCcw size={14} color="#10b981" />
            <span>100% SATISFACTION GUARANTEE</span>
          </div>
          <h1 className="policy-title">
            রিটার্ন ও রিফান্ড পলিসি
          </h1>
          <p className="policy-subtitle">
            গ্রাহকের সন্তুষ্টিই আমাদের প্রধান অগ্রাধিকার। পণ্যের কোনো ত্রুটি থাকলে আমরা সম্পূর্ণ বিনামূল্যে রিটার্ন ও দ্রুত রিফান্ড প্রদান করি।
          </p>
        </header>

        {/* 3 Step Return Process Grid */}
        <div className="policy-cards-grid">
          <div className="policy-card-item">
            <div className="policy-step-counter">১</div>
            <h3 className="policy-card-heading">ডেলিভারির সময় যাচাই</h3>
            <p className="policy-card-text">
              ডেলিভারিম্যানের উপস্থিতিতে পার্সেল খুলে পণ্যের সিল ও গ্লাস জার ঠিক আছে কিনা পরীক্ষা করে নিন।
            </p>
          </div>

          <div className="policy-card-item">
            <div className="policy-step-counter">২</div>
            <h3 className="policy-card-heading">তাৎক্ষণিক অভিযোগ</h3>
            <p className="policy-card-text">
              যদি পণ্য ভাঙা বা ভুল আইটেম পেয়ে থাকেন, ডেলিভারিম্যানকে সঙ্গে সঙ্গেই জানান বা আমাদের হটলাইনে কল দিন।
            </p>
          </div>

          <div className="policy-card-item">
            <div className="policy-step-counter">৩</div>
            <h3 className="policy-card-heading">২৪ ঘণ্টায় রিফান্ড/রিপ্লেসমেন্ট</h3>
            <p className="policy-card-text">
              বিনা খরচে নতুন ফ্রেশ প্রোডাক্ট পাঠানো হবে অথবা বিকাশ/নগদে ২৪ ঘণ্টার মধ্যে সম্পূর্ণ টাকা ফেরত দেওয়া হবে।
            </p>
          </div>
        </div>

        {/* Details Box */}
        <div className="policy-deep-info-box">
          <h2 className="policy-info-h2">রিটার্ন পলিসির শর্তাবলী</h2>
          <div className="policy-points-list">
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>পণ্য গ্রহণের সময় থেকে <strong>৭ দিনের মধ্যে</strong> যেকোনো অভিযোগের সমাধান পাবেন।</span>
            </div>
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>রিটার্ন বা ড্যামেজের ক্ষেত্রে কোনো অতিরিক্ত ডেলিভারি ফি নেওয়া হয় না।</span>
            </div>
            <div className="policy-point-row">
              <CheckCircle2 size={16} color="#10b981" />
              <span>খাঁটি মানের কোনো ব্যত্যয় ঘটলে সম্পূর্ণ রিফান্ড ও দুঃখপ্রকাশের নিশ্চয়তা।</span>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="policy-cta-row">
          <Link to="/contact" className="btn btn-primary">
            <PhoneCall size={16} />
            <span>সরাসরি সাপোর্ট টিমে কথা বলুন</span>
          </Link>
          <Link to="/shop" className="btn btn-outline-green">
            <span>শপে ফিরে যান</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReturnPolicy;
