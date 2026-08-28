import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Printer, Download, X, CheckCircle, Leaf, ShieldCheck, Phone, Mail, MapPin, Loader2, FileText, Award, CheckCircle2 } from 'lucide-react';

function InvoiceModal({ order, onClose }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!order) return null;

  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDirectDownload = async () => {
    const invoiceElement = document.getElementById('printable-invoice');
    if (!invoiceElement) {
      window.print();
      return;
    }

    try {
      setIsDownloading(true);

      // Ultra-clean full-canvas capture with onclone to prevent ANY cropping
      const canvas = await html2canvas(invoiceElement, {
        scale: 2.5, // 300 DPI ultra-sharp retina export
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1200,
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('printable-invoice');
          if (el) {
            el.style.width = '820px';
            el.style.maxWidth = '820px';
            el.style.height = 'auto';
            el.style.maxHeight = 'none';
            el.style.overflow = 'visible';
            el.style.margin = '0 auto';
            el.style.padding = '2.5rem 2.5rem 3rem';
            el.style.background = '#ffffff';
            el.style.boxShadow = 'none';
            el.style.borderRadius = '0';
          }
        }
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = image;
      link.download = `Invoice_${order.orderId || 'URMIRA'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.warn('Direct canvas download error, opening native print / save as PDF:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="invoice-modal-controls no-print">
          <div className="invoice-controls-left">
            <span className="invoice-modal-title">অফিসিয়াল ক্যাশ অন ডেলিভারি ইনভয়েস</span>
            <span className="invoice-modal-id">#{order.orderId}</span>
          </div>

          <div className="invoice-controls-right">
            {/* Standard Print / Save as PDF Button */}
            <button 
              className="btn-invoice-action btn-invoice-print" 
              onClick={handlePrint}
              aria-label="Save PDF / Print"
            >
              <FileText size={15} />
              <span>Save PDF / Print</span>
            </button>

            {/* 1-Click Image Download Button */}
            <button 
              className="btn-invoice-action btn-invoice-download" 
              onClick={handleDirectDownload}
              disabled={isDownloading}
              aria-label="Download Image"
            >
              {isDownloading ? (
                <Loader2 size={15} className="spin-icon" />
              ) : downloadSuccess ? (
                <CheckCircle size={15} color="#10b981" />
              ) : (
                <Download size={15} />
              )}
              <span>{isDownloading ? 'ইমেজ তৈরি হচ্ছে...' : downloadSuccess ? 'ডাউনলোড সম্পন্ন!' : 'ডাউনলোড ইমেজ (PNG)'}</span>
            </button>

            <button 
              className="btn-invoice-close" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body */}
        <div className="printable-invoice-paper" id="printable-invoice">
          {/* Header Row */}
          <div className="invoice-paper-header">
            <div className="invoice-brand-block">
              <div className="invoice-logo-row">
                <div className="invoice-leaf-circle">
                  <Leaf size={18} color="#ffffff" />
                </div>
                <div className="invoice-brand-names">
                  <span className="invoice-brand-main">URMIRA</span>
                  <span className="invoice-brand-sub">ORGANIC FOODS</span>
                </div>
              </div>
              <p className="invoice-company-desc">
                ১০০% বিশুদ্ধ, নিরাপদ ও প্রিমিয়াম প্রাকৃতিক অর্গানিক খাদ্যপণ্য
              </p>
              <div className="invoice-company-meta">
                <span><MapPin size={12} color="#059669" /> ঢাকা, বাংলাদেশ</span>
                <span><Phone size={12} color="#059669" /> 01712-345678</span>
                <span><Mail size={12} color="#059669" /> order@urmira.com</span>
              </div>
            </div>

            <div className="invoice-meta-block">
              <div className="invoice-tag-box">
                <span className="invoice-tag-label">INVOICE</span>
                <span className="invoice-tag-number">#{order.orderId}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">তারিখ:</span>
                <span className="meta-val">{formattedDate}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">অর্ডার স্ট্যাটাস:</span>
                <span className="status-badge-pending">
                  {order.orderStatus || 'Pending'}
                </span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">পেমেন্ট মেথড:</span>
                <span className="meta-val" style={{ color: '#054231', fontWeight: '800' }}>
                  {order.paymentMethod || 'Cash on Delivery'}
                </span>
              </div>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Customer Bill To & Shipping Row */}
          <div className="invoice-bill-to-grid">
            <div className="bill-to-box">
              <span className="bill-to-heading">গ্রাহকের বিবরণ (BILLED TO):</span>
              <h4 className="bill-to-name">{order.customerName}</h4>
              <p className="bill-to-line"><Phone size={13} color="#059669" /> <strong>{order.customerPhone}</strong></p>
              <p className="bill-to-line"><MapPin size={13} color="#059669" /> {order.customerAddress}</p>
            </div>

            <div className="delivery-info-box">
              <span className="bill-to-heading">ডেলিভারি ও শিপিং তথ্য:</span>
              <p className="delivery-info-line">
                <strong>ডেলিভারি এলাকা:</strong> {order.deliveryZone === 'inside' ? 'ঢাকার ভেতরে (৳ ৭০)' : 'ঢাকার বাইরে (৳ ১৩০)'}
              </p>
              <p className="delivery-info-line">
                <strong>ডেলিভারি ধরণ:</strong> হোম ডেলিভারি (ক্যাশ অন ডেলিভারি)
              </p>
              <p className="delivery-info-line">
                <strong>নিরাপত্তা:</strong> পণ্য হাতে পেয়ে চেক করে পেমেন্ট
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="invoice-table-wrap">
            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th style={{ width: '48%' }}>পণ্যের বিবরণ (Item Description)</th>
                  <th style={{ width: '14%', textAlign: 'center' }}>পরিমাণ</th>
                  <th style={{ width: '18%', textAlign: 'right' }}>একক মূল্য</th>
                  <th style={{ width: '20%', textAlign: 'right' }}>মোট মূল্য</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems && order.cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="table-item-name">{item.name}</div>
                      <div className="table-item-sub">Net: 500g Glass Jar • 100% Premium Organic</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '800', fontSize: '0.95rem' }}>
                      {item.quantity}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: '600' }}>
                      ৳ {item.price.toLocaleString('en-US')}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', color: '#054231', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation & Trust Note Row */}
          <div className="invoice-summary-grid">
            <div className="invoice-notes-block">
              <div className="invoice-trust-badge">
                <ShieldCheck size={16} color="#054231" />
                <span>১০০% খাঁটি ও নির্ভেজাল পণ্যের গ্যারান্টি</span>
              </div>
              <p className="invoice-note-text">
                পার্সেল রিসিভ করার সময় ডেলিভারিম্যানের সামনে পণ্য চেক করে গ্রহণ করুন। যেকোনো তথ্যে আমাদের হেল্পলাইনে যোগাযোগ করুন: <strong>01712-345678</strong>।
              </p>
              <div className="invoice-verified-seal">
                <Award size={15} color="#10b981" />
                <span>OFFICIAL VERIFIED ORDER • URMIRA ORGANIC</span>
              </div>
            </div>

            <div className="invoice-calc-box">
              <div className="calc-row">
                <span>পণ্য মোট (Subtotal):</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '700' }}>৳ {(order.subtotal || 0).toLocaleString('en-US')}</span>
              </div>
              <div className="calc-row">
                <span>ডেলিভারি চার্জ (Delivery):</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: '700' }}>৳ {(order.deliveryFee || 0).toLocaleString('en-US')}</span>
              </div>
              <div className="calc-row-grand">
                <span>সর্বমোট প্রদেয়:</span>
                <span className="grand-price" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  ৳ {(order.grandTotal || 0).toLocaleString('en-US')}
                </span>
              </div>
              <div className="payment-status-tag">
                <span>পেমেন্ট: <strong>{order.paymentStatus || 'Pending (COD)'}</strong></span>
              </div>
            </div>
          </div>

          {/* Footer Signature & Guarantee Bar */}
          <div className="invoice-paper-footer">
            <div className="invoice-footer-left">
              <p>Thank you for shopping with <strong>Urmira Organic Foods</strong>!</p>
              <span className="invoice-web-link">www.urmira.com • Helpline: 01712-345678</span>
            </div>
            <div className="invoice-signature-block">
              <div className="signature-line"></div>
              <span>কর্তৃপক্ষের স্বাক্ষর (Authorized Seal)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
