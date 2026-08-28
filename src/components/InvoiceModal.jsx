import { useState } from 'react';
import html2canvas from 'html2canvas';
import { Printer, Download, X, CheckCircle, Leaf, ShieldCheck, Phone, Mail, MapPin, Loader2, FileText } from 'lucide-react';

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
      const canvas = await html2canvas(invoiceElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0
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
            <span className="invoice-modal-title">অফিসিয়াল অর্ডার ইনভয়েস</span>
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
              <span>{isDownloading ? 'প্রসেসিং...' : downloadSuccess ? 'ডাউনলোড সম্পন্ন' : 'ডাউনলোড (PNG)'}</span>
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
                  <Leaf size={16} color="#ffffff" />
                </div>
                <div className="invoice-brand-names">
                  <span className="invoice-brand-main">URMIRA</span>
                  <span className="invoice-brand-sub">ORGANIC FOODS</span>
                </div>
              </div>
              <p className="invoice-company-desc">
                ১০০% বিশুদ্ধ ও প্রিমিয়াম প্রাকৃতিক অর্গানিক খাদ্যপণ্য
              </p>
              <div className="invoice-company-meta">
                <span><MapPin size={11} /> ঢাকা, বাংলাদেশ</span>
                <span><Phone size={11} /> 01712-345678</span>
                <span><Mail size={11} /> order@urmira.com</span>
              </div>
            </div>

            <div className="invoice-meta-block">
              <div className="invoice-tag-box">
                <span className="invoice-tag-label">INVOICE</span>
                <span className="invoice-tag-number">#{order.orderId}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">Date:</span>
                <span className="meta-val">{formattedDate}</span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">Order Status:</span>
                <span className={`meta-val status-badge-${order.orderStatus ? order.orderStatus.toLowerCase() : 'pending'}`}>
                  {order.orderStatus || 'Pending'}
                </span>
              </div>
              <div className="invoice-meta-item">
                <span className="meta-label">Payment Method:</span>
                <span className="meta-val">{order.paymentMethod || 'Cash on Delivery'}</span>
              </div>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Customer Bill To Row */}
          <div className="invoice-bill-to-grid">
            <div className="bill-to-box">
              <span className="bill-to-heading">Billed To (Customer):</span>
              <h4 className="bill-to-name">{order.customerName}</h4>
              <p className="bill-to-line"><Phone size={12} /> {order.customerPhone}</p>
              <p className="bill-to-line"><MapPin size={12} /> {order.customerAddress}</p>
            </div>

            <div className="delivery-info-box">
              <span className="bill-to-heading">Shipping & Delivery Info:</span>
              <p className="delivery-info-line">
                <strong>Zone:</strong> {order.deliveryZone === 'inside' ? 'ঢাকার ভেতরে (৳ ৭০)' : 'ঢাকার বাইরে (৳ ১৩০)'}
              </p>
              <p className="delivery-info-line">
                <strong>Delivery Type:</strong> Express Home Delivery with COD
              </p>
              <p className="delivery-info-line">
                <strong>Security:</strong> 100% Inspection on Delivery
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="invoice-table-wrap">
            <table className="invoice-items-table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>Item Description</th>
                  <th style={{ width: '15%', textAlign: 'center' }}>Qty</th>
                  <th style={{ width: '20%', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ width: '20%', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems && order.cartItems.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="table-item-name">{item.name}</div>
                      <div className="table-item-sub">Net: 500g Glass Jar • Premium Organic</div>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: '800' }}>
                      {item.quantity}
                    </td>
                    <td style={{ textAlign: 'right', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ৳ {item.price.toLocaleString('en-US')}
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: '800', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                      ৳ {(item.price * item.quantity).toLocaleString('en-US')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Calculation Summary Row */}
          <div className="invoice-summary-grid">
            <div className="invoice-notes-block">
              <div className="invoice-trust-badge">
                <ShieldCheck size={16} color="#054231" />
                <span>অরিজিনাল কোয়ালিটি ও মান গ্যারান্টি</span>
              </div>
              <p className="invoice-note-text">
                পার্সেল রিসিভ করার সময় ডেলিভারিম্যানের সামনে পণ্য চেক করে গ্রহণ করুন। কোনো অভিযোগ বা সহায়তার জন্য আমাদের হটলাইনে যোগাযোগ করুন: 01712-345678।
              </p>
            </div>

            <div className="invoice-calc-box">
              <div className="calc-row">
                <span>Subtotal:</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {(order.subtotal || 0).toLocaleString('en-US')}</span>
              </div>
              <div className="calc-row">
                <span>Delivery Charge:</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {(order.deliveryFee || 0).toLocaleString('en-US')}</span>
              </div>
              <div className="calc-row-grand">
                <span>Total Amount:</span>
                <span className="grand-price" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  ৳ {(order.grandTotal || 0).toLocaleString('en-US')}
                </span>
              </div>
              <div className="payment-status-tag">
                <span>Payment: <strong>{order.paymentStatus || 'Pending (COD)'}</strong></span>
              </div>
            </div>
          </div>

          {/* Footer Thank You */}
          <div className="invoice-paper-footer">
            <div className="invoice-footer-left">
              <p>Thank you for choosing <strong>Urmira Organic</strong>!</p>
              <span className="invoice-web-link">www.urmira.com</span>
            </div>
            <div className="invoice-signature-block">
              <div className="signature-line"></div>
              <span>Authorized Signature</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceModal;
