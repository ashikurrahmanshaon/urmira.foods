import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  getOrders, 
  updateOrderStatus, 
  updatePaymentStatus, 
  deleteOrder, 
  getAutomationSettings, 
  saveAutomationSettings,
  sendWebhookAutomation,
  isAdminAuthenticated,
  loginAdmin,
  logoutAdmin,
  getAdminCredentials,
  updateAdminCredentials
} from '../utils/orderStorage';
import InvoiceModal from '../components/InvoiceModal';
import { 
  Package, 
  Printer, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  DollarSign, 
  FileSpreadsheet, 
  Settings, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  Send, 
  Download,
  Phone,
  MapPin,
  Lock,
  KeyRound,
  LogOut,
  Eye,
  EyeOff,
  ShieldCheck,
  RotateCw,
  MessageCircle,
  TrendingUp,
  AlertCircle,
  X,
  BarChart3,
  PieChart,
  ShoppingBag,
  Sparkles,
  ArrowUpRight,
  Globe,
  Leaf,
  Layers
} from 'lucide-react';

function AdminOrders() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'analytics' | 'automation' | 'security'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState('Just now');
  
  // Automation settings state
  const [settings, setSettings] = useState({
    googleSheetWebhookUrl: '',
    adminNotificationEmail: 'admin@urmira.com',
    autoSendOnOrder: true
  });
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Security Credentials change state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [credsSaved, setCredsSaved] = useState(false);

  // Real-time synchronization
  const refreshOrders = useCallback(() => {
    setIsRefreshing(true);
    setOrders(getOrders());
    setLastSyncTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    setTimeout(() => setIsRefreshing(false), 450);
  }, []);

  useEffect(() => {
    const authStatus = isAdminAuthenticated();
    setIsAuthenticated(authStatus);
    if (authStatus) {
      refreshOrders();
      setSettings(getAutomationSettings());
      const creds = getAdminCredentials();
      setNewUsername(creds.username);

      // Real-time storage listener for instant cross-tab order sync
      const handleStorageChange = (e) => {
        if (e.key === 'urmira_orders_db') {
          refreshOrders();
        }
      };
      window.addEventListener('storage', handleStorageChange);

      // 4-Second auto-polling interval
      const interval = setInterval(refreshOrders, 4000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, [refreshOrders]);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const result = loginAdmin(usernameInput, passwordInput);
    if (result.success) {
      setIsAuthenticated(true);
      refreshOrders();
      setSettings(getAutomationSettings());
      const creds = getAdminCredentials();
      setNewUsername(creds.username);
    } else {
      setLoginError(result.message);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
    setUsernameInput('');
    setPasswordInput('');
  };

  const handleUpdateCredentials = (e) => {
    e.preventDefault();
    if (!newUsername.trim() || !newPassword.trim()) {
      alert('দয়া করে নতুন ইউজারনেম এবং পাসওয়ার্ড পূরণ করুন।');
      return;
    }
    updateAdminCredentials(newUsername, newPassword);
    setCredsSaved(true);
    setTimeout(() => setCredsSaved(false), 2500);
  };

  const handleStatusChange = (orderId, newStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handlePaymentStatusChange = (orderId, newStatus) => {
    const updated = updatePaymentStatus(orderId, newStatus);
    setOrders(updated);
  };

  const handleDelete = (orderId) => {
    if (window.confirm(`Are you sure you want to delete order #${orderId}?`)) {
      const updated = deleteOrder(orderId);
      setOrders(updated);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    saveAutomationSettings(settings);
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 2500);
  };

  const handleTestWebhook = async () => {
    const testOrder = {
      orderId: 'URM-TEST-' + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      customerName: 'Ashikur Rahman (Test)',
      customerPhone: '01712345678',
      customerAddress: 'House 12, Road 5, Dhanmondi, Dhaka',
      deliveryFee: 70,
      cartItems: [{ name: 'Pure Cow Ghee (খাঁটি গাওয়া ঘি)', quantity: 1, price: 1200 }],
      subtotal: 1200,
      grandTotal: 1270,
      orderStatus: 'Pending',
      paymentStatus: 'Pending (COD)',
      paymentMethod: 'Cash on Delivery'
    };

    setTestSent(true);
    await sendWebhookAutomation(testOrder);
    setTimeout(() => setTestSent(false), 3000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order ID,Date,Customer Name,Phone,Address,Items,Subtotal,Delivery Fee,Grand Total,Order Status,Payment Status,Payment Method'];
    const rows = orders.map(o => {
      const items = o.cartItems ? o.cartItems.map(i => `${i.name} (x${i.quantity})`).join('; ') : '';
      return `"${o.orderId}","${new Date(o.createdAt).toLocaleString()}","${o.customerName}","${o.customerPhone}","${o.customerAddress.replace(/"/g, '""')}","${items}",${o.subtotal},${o.deliveryFee},${o.grandTotal},"${o.orderStatus}","${o.paymentStatus}","${o.paymentMethod}"`;
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `urmira_orders_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and Search logic
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
    const matchesSearch = 
      (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (order.customerPhone && order.customerPhone.includes(searchQuery)) ||
      (order.orderId && order.orderId.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Calculate Executive Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
  const pendingCount = orders.filter(o => o.orderStatus === 'Pending').length;
  const confirmedCount = orders.filter(o => o.orderStatus === 'Confirmed').length;
  const shippedCount = orders.filter(o => o.orderStatus === 'Shipped').length;
  const deliveredCount = orders.filter(o => o.orderStatus === 'Delivered').length;
  const paidCount = orders.filter(o => o.paymentStatus === 'Paid').length;
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  const [timeframe, setTimeframe] = useState('today'); // 'today' | '7days' | '14days' | 'month' | 'year'

  // Analytics Computation for All Timeframes (Today, 7 Days, 14 Days, Month, Year)
  const analyticsData = useMemo(() => {
    const now = new Date();
    let timeframeOrders = [];
    let buckets = [];

    if (timeframe === 'today') {
      const todayStr = now.toDateString();
      timeframeOrders = orders.filter(o => new Date(o.createdAt).toDateString() === todayStr);

      const slots = [
        { label: '06:00 - 10:00 (সকাল)', shortLabel: '06-10 AM', start: 6, end: 10, revenue: 0, orders: 0 },
        { label: '10:00 - 14:00 (দুপুর)', shortLabel: '10-02 PM', start: 10, end: 14, revenue: 0, orders: 0 },
        { label: '14:00 - 18:00 (বিকাল)', shortLabel: '02-06 PM', start: 14, end: 18, revenue: 0, orders: 0 },
        { label: '18:00 - 22:00 (সন্ধ্যা)', shortLabel: '06-10 PM', start: 18, end: 22, revenue: 0, orders: 0 },
        { label: '22:00 - 06:00 (রাত)', shortLabel: 'Night', start: 22, end: 6, revenue: 0, orders: 0 }
      ];

      timeframeOrders.forEach(o => {
        const hour = new Date(o.createdAt).getHours();
        const slot = slots.find(s => s.start <= s.end ? (hour >= s.start && hour < s.end) : (hour >= s.start || hour < s.end));
        if (slot) {
          slot.revenue += (o.grandTotal || 0);
          slot.orders += 1;
        }
      });
      buckets = slots;
    } else if (timeframe === '7days') {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toDateString();
        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
        const dayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        days.push({ label: `${dayName}, ${dayDate}`, shortLabel: dayName, dateStr, revenue: 0, orders: 0 });
      }

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      timeframeOrders = orders.filter(o => new Date(o.createdAt) >= cutoff);

      timeframeOrders.forEach(o => {
        const dStr = new Date(o.createdAt).toDateString();
        const day = days.find(d => d.dateStr === dStr);
        if (day) {
          day.revenue += (o.grandTotal || 0);
          day.orders += 1;
        }
      });
      buckets = days;
    } else if (timeframe === '14days') {
      const days = [];
      for (let i = 13; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toDateString();
        const dayShort = d.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
        const dayFull = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        days.push({ label: dayFull, shortLabel: dayShort, dateStr, revenue: 0, orders: 0 });
      }

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 14);
      timeframeOrders = orders.filter(o => new Date(o.createdAt) >= cutoff);

      timeframeOrders.forEach(o => {
        const dStr = new Date(o.createdAt).toDateString();
        const day = days.find(d => d.dateStr === dStr);
        if (day) {
          day.revenue += (o.grandTotal || 0);
          day.orders += 1;
        }
      });
      buckets = days;
    } else if (timeframe === 'month') {
      const weeks = [
        { label: 'Week 1 (Days 1 - 7)', shortLabel: 'Week 1', days: [0, 7], revenue: 0, orders: 0 },
        { label: 'Week 2 (Days 8 - 14)', shortLabel: 'Week 2', days: [7, 14], revenue: 0, orders: 0 },
        { label: 'Week 3 (Days 15 - 21)', shortLabel: 'Week 3', days: [14, 21], revenue: 0, orders: 0 },
        { label: 'Week 4 (Days 22 - 28)', shortLabel: 'Week 4', days: [21, 28], revenue: 0, orders: 0 },
        { label: 'Week 5 (Days 29 - 30+)', shortLabel: 'Week 5', days: [28, 32], revenue: 0, orders: 0 }
      ];

      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 30);
      timeframeOrders = orders.filter(o => new Date(o.createdAt) >= cutoff);

      timeframeOrders.forEach(o => {
        const diffDays = Math.floor((now - new Date(o.createdAt)) / (1000 * 60 * 60 * 24));
        const wk = weeks.find(w => diffDays >= w.days[0] && diffDays < w.days[1]);
        if (wk) {
          wk.revenue += (o.grandTotal || 0);
          wk.orders += 1;
        }
      });
      buckets = weeks;
    } else if (timeframe === 'year') {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m, idx) => ({
        label: `${m} ${now.getFullYear()}`,
        shortLabel: m,
        monthIdx: idx,
        revenue: 0,
        orders: 0
      }));

      timeframeOrders = orders.filter(o => new Date(o.createdAt).getFullYear() === now.getFullYear());

      timeframeOrders.forEach(o => {
        const mIdx = new Date(o.createdAt).getMonth();
        if (months[mIdx]) {
          months[mIdx].revenue += (o.grandTotal || 0);
          months[mIdx].orders += 1;
        }
      });
      buckets = months;
    }

    const periodRevenue = timeframeOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
    const periodOrdersCount = timeframeOrders.length;
    const periodAvgOrder = periodOrdersCount > 0 ? Math.round(periodRevenue / periodOrdersCount) : 0;

    // Product breakdown
    const productPool = timeframeOrders.length > 0 ? timeframeOrders : orders;
    let gheeSales = 0, gheeRevenue = 0, bombSales = 0, bombRevenue = 0, dhakaInside = 0, dhakaOutside = 0;

    productPool.forEach(order => {
      if (order.deliveryZone === 'inside') dhakaInside++;
      else dhakaOutside++;

      if (order.cartItems) {
        order.cartItems.forEach(item => {
          const name = (item.name || '').toLowerCase();
          if (name.includes('ghee') || name.includes('ঘি')) {
            gheeSales += item.quantity || 1;
            gheeRevenue += (item.price || 1200) * (item.quantity || 1);
          } else {
            bombSales += item.quantity || 1;
            bombRevenue += (item.price || 850) * (item.quantity || 1);
          }
        });
      }
    });

    const totalProductRevenue = gheeRevenue + bombRevenue || 1;
    const gheePercent = Math.round((gheeRevenue / totalProductRevenue) * 100);
    const bombPercent = 100 - gheePercent;

    const maxBucketRevenue = Math.max(...buckets.map(b => b.revenue), 800);

    return {
      timeframe,
      periodRevenue,
      periodOrdersCount,
      periodAvgOrder,
      buckets,
      maxBucketRevenue,
      gheeSales,
      gheeRevenue,
      bombSales,
      bombRevenue,
      gheePercent,
      bombPercent,
      dhakaInside,
      dhakaOutside
    };
  }, [orders, timeframe]);

  const googleAppsScriptSnippet = `// URMIRA.COM - Google Sheet Automation Webhook
// অপশন ১: যদি আপনি Google Sheet এর ভেতর থেকে (Extensions > Apps Script) যান, তবে নিচের SHEET_URL এ কিছু লিখতে হবে না।
// অপশন ২: যদি আপনি আলাদা Apps Script খুলেন, তবে আপনার Google Sheet এর সম্পূর্ণ লিংকটি নিচের কোটেশনের ভেতর পেস্ট করুন:
var GOOGLE_SHEET_URL = ""; 

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet;
    if (GOOGLE_SHEET_URL && GOOGLE_SHEET_URL.indexOf("http") === 0) {
      sheet = SpreadsheetApp.openByUrl(GOOGLE_SHEET_URL).getActiveSheet();
    } else {
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      if (ss) {
        sheet = ss.getActiveSheet();
      } else {
        throw new Error("Active sheet not found. Please paste your Google Sheet link in GOOGLE_SHEET_URL above or open Apps Script from inside Google Sheets (Extensions > Apps Script)!");
      }
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try { data = JSON.parse(e.postData.contents); } catch (jsonErr) { data = e.parameter || {}; }
    } else if (e && e.parameter) {
      data = e.parameter;
    }
    
    // Auto Header Row
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Order ID", "Date", "Customer Name", "Phone Number", 
        "Delivery Address", "Items", "Subtotal", "Delivery Fee", 
        "Grand Total", "Order Status", "Payment Status", "Payment Method"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight("bold")
        .setBackground("#054231")
        .setFontColor("#ffffff");
    }
    
    // Append Order Row
    sheet.appendRow([
      data.orderId || "N/A",
      data.date || new Date().toLocaleString(),
      data.customerName || "N/A",
      "'" + (data.customerPhone || "N/A"),
      data.customerAddress || "N/A",
      data.items || "N/A",
      data.subtotal || 0,
      data.deliveryFee || 0,
      data.totalAmount || 0,
      data.orderStatus || "Pending",
      data.paymentStatus || "Pending (COD)",
      data.paymentMethod || "Cash on Delivery"
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) { return doPost(e); }`;

  const copyScriptCode = () => {
    navigator.clipboard.writeText(googleAppsScriptSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // ----------------------------------------------------
  // 1. SECURE ADMIN LOGIN SCREEN (When Not Authenticated)
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="admin-login-backdrop">
        <div className="admin-login-card">
          <div className="login-shield-aura">
            <Lock size={32} color="#054231" />
          </div>

          <span className="login-badge-pill">
            <KeyRound size={12} />
            <span>SECURE ADMIN ACCESS</span>
          </span>

          <h2 className="login-title">Admin Authentication</h2>
          <p className="login-subtitle">
            অর্ডার ও অ্যানালিটিক্স প্যানেল অ্যাক্সেস করতে আপনার অ্যাডমিন ইউজারনেম ও পাসওয়ার্ড দিয়ে প্রবেশ করুন।
          </p>

          {loginError && (
            <div className="login-error-box">
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form-body">
            <div className="form-field-group">
              <label className="ios-field-label">Username</label>
              <input 
                type="text" 
                className="ios-input-field" 
                placeholder="admin"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-field-group">
              <label className="ios-field-label">Password</label>
              <div className="password-input-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className="ios-input-field" 
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button 
                  type="button" 
                  className="btn-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password view"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-default-hint">
              <span>Default Credentials:</span> <strong>admin</strong> / <strong>urmira2026</strong>
            </div>

            <button type="submit" className="btn btn-primary login-submit-btn">
              <Lock size={16} />
              <span>Login to Executive Portal</span>
            </button>
          </form>

          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link to="/" style={{ fontSize: '0.82rem', color: '#64748b', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span>← Back to Urmira Store</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. AUTHENTICATED EXECUTIVE FULLSCREEN PORTAL
  // ----------------------------------------------------
  return (
    <div className="admin-portal-fullscreen">
      
      {/* 🌟 Dedicated Luxury Executive Top Bar with Navigation Tabs placed directly on top */}
      <header className="executive-navbar">
        <div className="executive-nav-container">
          
          {/* Brand & Portal Badge */}
          <div className="executive-brand-area">
            <div className="executive-logo-symbol">
              <Leaf size={18} color="#ffffff" />
            </div>
            <div className="executive-brand-titles">
              <span className="executive-brand-title">URMIRA</span>
              <span className="executive-portal-tag">EXECUTIVE SUITE</span>
            </div>
          </div>

          {/* Navigation Tab Switcher Placed Directly in Top Header Bar */}
          <div className="executive-tab-switcher topbar-tab-switcher">
            <button 
              className={`executive-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={14} />
              <span>Orders ({orders.length})</span>
            </button>

            <button 
              className={`executive-tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 size={14} />
              <span>Analytics & Graphs</span>
            </button>

            <button 
              className={`executive-tab-btn ${activeTab === 'automation' ? 'active' : ''}`}
              onClick={() => setActiveTab('automation')}
            >
              <FileSpreadsheet size={14} />
              <span>Google Sheets Sync</span>
            </button>

            <button 
              className={`executive-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <KeyRound size={14} />
              <span>Security</span>
            </button>
          </div>

          {/* Right Action Tools & Live Sync */}
          <div className="executive-nav-right">
            <div className="live-sync-indicator-pill">
              <span className="live-sync-green-dot"></span>
              <span>Live Sync</span>
              <button 
                className={`btn-sync-refresh ${isRefreshing ? 'spinning' : ''}`}
                onClick={refreshOrders}
                title="Force Sync Now"
              >
                <RotateCw size={12} />
              </button>
            </div>

            <Link 
              to="/" 
              target="_blank" 
              className="btn-visit-store"
              title="Open Live Public Store in New Tab"
            >
              <Globe size={13} />
              <span>Live Store</span>
              <ArrowUpRight size={11} />
            </Link>

            <div className="admin-user-capsule">
              <div className="admin-avatar-dot"></div>
              <span>admin</span>
            </div>

            <button 
              className="btn-admin-logout"
              onClick={handleLogout}
              title="Logout from Executive Portal"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Portal Content Container */}
      <div className="executive-portal-body">

        {/* ========================================================
            TAB 1: ORDERS MANAGEMENT
            ======================================================== */}
        {activeTab === 'orders' && (
          <>
            {/* Executive KPI Metrics Grid */}
            <div className="admin-metrics-grid">
              <div className="admin-metric-card kpi-card-revenue">
                <div className="metric-icon-circle metric-green">
                  <DollarSign size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Total Revenue</span>
                  <strong className="metric-value" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                    ৳ {totalRevenue.toLocaleString('en-US')}
                  </strong>
                  <span className="metric-sub-tag">
                    <TrendingUp size={11} />
                    <span>{paidCount} Paid • {orders.length - paidCount} COD</span>
                  </span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-circle metric-blue">
                  <Package size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Total Orders</span>
                  <strong className="metric-value">{orders.length}</strong>
                  <span className="metric-sub-tag text-blue">
                    Avg Order: ৳ {avgOrderValue.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              <div className="admin-metric-card kpi-card-pending">
                <div className="metric-icon-circle metric-amber">
                  <Clock size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Pending Confirmation</span>
                  <strong className="metric-value text-amber">{pendingCount}</strong>
                  <span className="metric-sub-tag text-amber">
                    {pendingCount > 0 ? '⚡ Requires Action' : 'All cleared'}
                  </span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="metric-icon-circle metric-emerald">
                  <CheckCircle2 size={22} />
                </div>
                <div className="metric-info">
                  <span className="metric-label">Processed & Shipped</span>
                  <strong className="metric-value text-emerald">{confirmedCount + shippedCount + deliveredCount}</strong>
                  <span className="metric-sub-tag text-emerald">
                    {deliveredCount} Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Filter & Live Search Controls */}
            <div className="admin-controls-card">
              <div className="admin-search-wrap">
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  className="admin-search-input" 
                  placeholder="Search by customer name, phone or Order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    className="search-clear-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="admin-filter-group">
                <div className="status-filter-pills">
                  {[
                    { id: 'All', label: `All (${orders.length})` },
                    { id: 'Pending', label: `Pending (${pendingCount})` },
                    { id: 'Confirmed', label: `Confirmed (${confirmedCount})` },
                    { id: 'Shipped', label: `Shipped (${shippedCount})` },
                    { id: 'Delivered', label: `Delivered (${deliveredCount})` },
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      className={`filter-pill-btn ${statusFilter === tab.id ? 'active' : ''}`}
                      onClick={() => setStatusFilter(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button 
                  className="btn-export-csv"
                  onClick={handleExportCSV}
                  title="Export orders to CSV file for Excel or Google Sheets"
                >
                  <Download size={14} />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Container: Desktop Table + Mobile Cards Stream */}
            <div className="admin-table-card">
              {filteredOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#6e6e73' }}>
                  <Package size={46} color="#9ca3af" style={{ margin: '0 auto 0.75rem' }} />
                  <h3 style={{ fontSize: '1.25rem', color: '#111827', fontWeight: '800' }}>No orders found</h3>
                  <p style={{ fontSize: '0.88rem' }}>Try clearing your search query or switching status filters.</p>
                </div>
              ) : (
                <>
                  {/* 🖥️ Desktop Table View (>= 768px) */}
                  <div className="admin-table-overflow admin-desktop-view">
                    <table className="admin-orders-table">
                      <thead>
                        <tr>
                          <th style={{ width: '16%' }}>Order ID & Time</th>
                          <th style={{ width: '26%' }}>Customer & Direct Contact</th>
                          <th style={{ width: '22%' }}>Ordered Items</th>
                          <th style={{ width: '14%' }}>Payable Amount</th>
                          <th style={{ width: '11%' }}>Status & Workflow</th>
                          <th style={{ width: '11%', textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.orderId} className={`order-row-${order.orderStatus ? order.orderStatus.toLowerCase() : 'pending'}`}>
                            <td>
                              <div className="order-id-badge">#{order.orderId}</div>
                              <div className="order-date-text">
                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </div>
                            </td>

                            <td>
                              <strong className="order-customer-name">{order.customerName}</strong>
                              
                              <div className="customer-contact-quick-actions">
                                <a 
                                  href={`tel:${order.customerPhone}`}
                                  className="quick-contact-btn phone-link"
                                  title="Click to call customer"
                                >
                                  <Phone size={11} />
                                  <span>{order.customerPhone}</span>
                                </a>

                                <a 
                                  href={`https://wa.me/88${order.customerPhone.replace(/\D/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="quick-contact-btn whatsapp-link"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageCircle size={11} />
                                  <span>WhatsApp</span>
                                </a>
                              </div>

                              <div className="order-customer-addr" title={order.customerAddress}>
                                <MapPin size={11} /> 
                                <span>{order.customerAddress}</span>
                              </div>
                            </td>

                            <td>
                              <div className="order-items-compact">
                                {order.cartItems && order.cartItems.map((item, idx) => (
                                  <div key={idx} className="compact-item-chip">
                                    <span className="item-name-text">{item.name.split('(')[0].trim()}</span>
                                    <span className="item-qty-badge">x{item.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td>
                              <div className="order-total-price" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                                ৳ {order.grandTotal ? order.grandTotal.toLocaleString('en-US') : 0}
                              </div>
                              <div className="order-delivery-tag">
                                {order.deliveryZone === 'inside' ? 'Dhaka (৳ 70)' : 'Outside (৳ 130)'}
                              </div>

                              <button 
                                className={`payment-toggle-pill ${order.paymentStatus === 'Paid' ? 'paid' : 'cod'}`}
                                onClick={() => handlePaymentStatusChange(order.orderId, order.paymentStatus === 'Paid' ? 'Pending (COD)' : 'Paid')}
                                title="Click to toggle Payment status"
                              >
                                {order.paymentStatus === 'Paid' ? '✓ Paid' : '⏳ Pending (COD)'}
                              </button>
                            </td>

                            <td>
                              {/* Desktop Workflow Stepper Hub */}
                              <div className="order-workflow-hub">
                                {order.orderStatus === 'Pending' && (
                                  <button 
                                    className="btn-workflow-step step-confirm"
                                    onClick={() => handleStatusChange(order.orderId, 'Confirmed')}
                                    title="1-Click to Confirm this order"
                                  >
                                    <Check size={12} />
                                    <span>Confirm</span>
                                  </button>
                                )}

                                {order.orderStatus === 'Confirmed' && (
                                  <button 
                                    className="btn-workflow-step step-ship"
                                    onClick={() => handleStatusChange(order.orderId, 'Shipped')}
                                    title="1-Click to Ship with Courier"
                                  >
                                    <Truck size={12} />
                                    <span>Ship</span>
                                  </button>
                                )}

                                {order.orderStatus === 'Shipped' && (
                                  <button 
                                    className="btn-workflow-step step-deliver"
                                    onClick={() => handleStatusChange(order.orderId, 'Delivered')}
                                    title="1-Click to Mark Delivered (Auto Paid)"
                                  >
                                    <CheckCircle2 size={12} />
                                    <span>Deliver</span>
                                  </button>
                                )}

                                <select 
                                  className={`status-select-badge status-${order.orderStatus ? order.orderStatus.toLowerCase() : 'pending'}`}
                                  value={order.orderStatus || 'Pending'}
                                  onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                >
                                  <option value="Pending">🟡 Pending</option>
                                  <option value="Confirmed">🟢 Confirmed</option>
                                  <option value="Shipped">🚚 Shipped</option>
                                  <option value="Delivered">✅ Delivered</option>
                                  <option value="Cancelled">🔴 Cancelled</option>
                                </select>
                              </div>
                            </td>

                            <td style={{ textAlign: 'right' }}>
                              <div className="table-actions-hub">
                                <button 
                                  className="btn-table-action btn-table-invoice"
                                  onClick={() => setSelectedOrderForInvoice(order)}
                                  title="View & Print Official 1-Page Invoice"
                                >
                                  <Printer size={13} />
                                  <span>Invoice</span>
                                </button>
                                
                                <button 
                                  className="btn-table-action btn-table-delete"
                                  onClick={() => handleDelete(order.orderId)}
                                  title="Delete Order"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 📱 Mobile Native Order Cards Stream (< 768px) */}
                  <div className="admin-mobile-cards-stream admin-mobile-view">
                    {filteredOrders.map((order) => (
                      <div key={order.orderId} className={`mobile-order-card status-border-${order.orderStatus ? order.orderStatus.toLowerCase() : 'pending'}`}>
                        {/* Card Top Row: ID, Time & Status Workflow */}
                        <div className="mobile-card-top">
                          <div>
                            <span className="mobile-order-id">#{order.orderId}</span>
                            <span className="mobile-order-time">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>

                          <div className="mobile-status-hub">
                            {order.orderStatus === 'Pending' && (
                              <button 
                                className="btn-workflow-step step-confirm"
                                onClick={() => handleStatusChange(order.orderId, 'Confirmed')}
                              >
                                <Check size={11} />
                                <span>Confirm</span>
                              </button>
                            )}

                            {order.orderStatus === 'Confirmed' && (
                              <button 
                                className="btn-workflow-step step-ship"
                                onClick={() => handleStatusChange(order.orderId, 'Shipped')}
                              >
                                <Truck size={11} />
                                <span>Ship</span>
                              </button>
                            )}

                            {order.orderStatus === 'Shipped' && (
                              <button 
                                className="btn-workflow-step step-deliver"
                                onClick={() => handleStatusChange(order.orderId, 'Delivered')}
                              >
                                <CheckCircle2 size={11} />
                                <span>Deliver</span>
                              </button>
                            )}

                            <select 
                              className={`status-select-badge status-${order.orderStatus ? order.orderStatus.toLowerCase() : 'pending'}`}
                              value={order.orderStatus || 'Pending'}
                              onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                            >
                              <option value="Pending">🟡 Pending</option>
                              <option value="Confirmed">🟢 Confirmed</option>
                              <option value="Shipped">🚚 Shipped</option>
                              <option value="Delivered">✅ Delivered</option>
                              <option value="Cancelled">🔴 Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Customer Info & 1-Tap Quick Action Buttons */}
                        <div className="mobile-card-customer">
                          <h4 className="mobile-cust-name">{order.customerName}</h4>
                          <p className="mobile-cust-addr"><MapPin size={12} /> {order.customerAddress}</p>
                          
                          <div className="mobile-contact-bar">
                            <a href={`tel:${order.customerPhone}`} className="mobile-btn-contact call-btn">
                              <Phone size={13} />
                              <span>Call {order.customerPhone}</span>
                            </a>
                            <a 
                              href={`https://wa.me/88${order.customerPhone.replace(/\D/g, '')}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="mobile-btn-contact whatsapp-btn"
                            >
                              <MessageCircle size={13} />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>

                        {/* Ordered Items Summary */}
                        <div className="mobile-card-items">
                          {order.cartItems && order.cartItems.map((item, idx) => (
                            <div key={idx} className="mobile-item-chip">
                              <span>{item.name.split('(')[0].trim()}</span>
                              <strong className="mobile-item-qty">x{item.quantity}</strong>
                            </div>
                          ))}
                        </div>

                        {/* Amount & Payment Status Row */}
                        <div className="mobile-card-price-row">
                          <div>
                            <span className="mobile-price-lbl">Payable Total:</span>
                            <strong className="mobile-grand-price" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                              ৳ {order.grandTotal ? order.grandTotal.toLocaleString('en-US') : 0}
                            </strong>
                            <span className="mobile-delivery-lbl">
                              ({order.deliveryZone === 'inside' ? 'Dhaka ৳ 70' : 'Outside ৳ 130'})
                            </span>
                          </div>

                          <button 
                            className={`payment-toggle-pill ${order.paymentStatus === 'Paid' ? 'paid' : 'cod'}`}
                            onClick={() => handlePaymentStatusChange(order.orderId, order.paymentStatus === 'Paid' ? 'Pending (COD)' : 'Paid')}
                          >
                            {order.paymentStatus === 'Paid' ? '✓ Paid' : '⏳ Pending (COD)'}
                          </button>
                        </div>

                        {/* Card Bottom Actions: 1-Tap Invoice & Delete */}
                        <div className="mobile-card-actions">
                          <button 
                            className="btn-mobile-invoice"
                            onClick={() => setSelectedOrderForInvoice(order)}
                          >
                            <Printer size={15} />
                            <span>1-Page Invoice</span>
                          </button>

                          <button 
                            className="btn-mobile-delete"
                            onClick={() => handleDelete(order.orderId)}
                            title="Delete Order"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* ========================================================
            TAB 2: SALES ANALYTICS & TIMEFRAME GRAPHS (NEW)
            ======================================================== */}
        {activeTab === 'analytics' && (
          <div className="analytics-dashboard-grid">
            
            {/* Top Control Bar: Timeframe Filters */}
            <div className="analytics-timeframe-bar chart-span-2">
              <div className="timeframe-bar-left">
                <span className="timeframe-label">Select Sales Timeframe:</span>
                <div className="timeframe-pills-wrap">
                  {[
                    { id: 'today', label: '⚡ Today (আজকের সেল)' },
                    { id: '7days', label: '📅 7 Days (Week)' },
                    { id: '14days', label: '🗓️ Last 14 Days' },
                    { id: 'month', label: '📆 This Month (30 Days)' },
                    { id: 'year', label: '📊 This Year (12 Months)' }
                  ].map(tf => (
                    <button 
                      key={tf.id}
                      className={`timeframe-pill-btn ${timeframe === tf.id ? 'active' : ''}`}
                      onClick={() => setTimeframe(tf.id)}
                    >
                      {tf.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="timeframe-bar-right">
                <span className="timeframe-range-title">
                  {timeframe === 'today' && "Today's Live Sales Analytics"}
                  {timeframe === '7days' && "Last 7 Days Sales Trend"}
                  {timeframe === '14days' && "14 Days Performance"}
                  {timeframe === 'month' && "Last 30 Days Trajectory"}
                  {timeframe === 'year' && "Annual Sales Breakdown (12 Months)"}
                </span>
              </div>
            </div>

            {/* Timeframe Summary Mini-KPIs */}
            <div className="analytics-mini-kpis chart-span-2">
              <div className="mini-kpi-card highlight-revenue">
                <span className="mini-kpi-lbl">Period Revenue</span>
                <strong className="mini-kpi-val" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  ৳ {analyticsData.periodRevenue.toLocaleString('en-US')}
                </strong>
                <span className="mini-kpi-sub">In selected window</span>
              </div>

              <div className="mini-kpi-card">
                <span className="mini-kpi-lbl">Orders Placed</span>
                <strong className="mini-kpi-val">{analyticsData.periodOrdersCount}</strong>
                <span className="mini-kpi-sub text-blue">Orders in window</span>
              </div>

              <div className="mini-kpi-card">
                <span className="mini-kpi-lbl">Avg. Order Value</span>
                <strong className="mini-kpi-val" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                  ৳ {analyticsData.periodAvgOrder.toLocaleString('en-US')}
                </strong>
                <span className="mini-kpi-sub">Per successful order</span>
              </div>

              <div className="mini-kpi-card">
                <span className="mini-kpi-lbl">Top Demand Product</span>
                <strong className="mini-kpi-val" style={{ fontSize: '1.05rem', color: '#054231' }}>
                  {analyticsData.gheeSales >= analyticsData.bombSales ? 'খাঁটি গাওয়া ঘি' : 'খেজুরের বোম্ব'}
                </strong>
                <span className="mini-kpi-sub text-emerald">Highest volume</span>
              </div>
            </div>
            
            {/* Main Graph: Revenue & Order Trajectory Bar Chart */}
            <div className="analytics-card-widget chart-span-2">
              <div className="widget-header-row">
                <div>
                  <h3 className="widget-title">
                    {timeframe === 'today' && "Today's Hourly Sales Velocity"}
                    {timeframe === '7days' && "7-Day Sales History & Trajectory"}
                    {timeframe === '14days' && "14-Day Sales Velocity Progression"}
                    {timeframe === 'month' && "30-Day Weekly Sales Curve"}
                    {timeframe === 'year' && "12-Month Annual Sales Progression"}
                  </h3>
                  <p className="widget-sub">Hover or tap on any bar to inspect exact revenue and order counts</p>
                </div>
                <div className="widget-badge-pill">
                  <TrendingUp size={13} />
                  <span>Real-time Velocity</span>
                </div>
              </div>

              {/* Dynamic CSS Bar Chart */}
              <div className="analytics-barchart-wrap">
                <div className="barchart-bars-container">
                  {analyticsData.buckets.map((b, idx) => {
                    const heightPercent = analyticsData.maxBucketRevenue > 0 && b.revenue > 0
                      ? Math.max(Math.round((b.revenue / analyticsData.maxBucketRevenue) * 100), 18)
                      : 6;
                    const isPeak = b.revenue > 0 && b.revenue === analyticsData.maxBucketRevenue;

                    return (
                      <div key={idx} className="barchart-bar-column">
                        <div className="bar-hover-tooltip">
                          <strong style={{ fontFamily: 'Plus Jakarta Sans' }}>৳ {b.revenue.toLocaleString()}</strong>
                          <span>{b.orders} orders</span>
                          <span className="tooltip-date-lbl">{b.label}</span>
                        </div>
                        <div className="bar-fill-track">
                          <div 
                            className={`bar-fill-dynamic ${isPeak ? 'peak-glow-bar' : ''}`}
                            style={{ height: `${heightPercent}%` }}
                          ></div>
                        </div>
                        <span className="bar-col-label">{b.shortLabel}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Product Share Breakdown */}
            <div className="analytics-card-widget">
              <div className="widget-header-row">
                <div>
                  <h3 className="widget-title">Product Demand Split</h3>
                  <p className="widget-sub">Revenue and volume ratio in this timeframe</p>
                </div>
                <PieChart size={18} color="#054231" />
              </div>

              <div className="product-split-progress-wrap">
                {/* Pure Cow Ghee */}
                <div className="product-split-row">
                  <div className="product-split-labels">
                    <span className="p-name">খাঁটি গাওয়া ঘি (Pure Cow Ghee)</span>
                    <strong className="p-val">৳ {analyticsData.gheeRevenue.toLocaleString()} ({analyticsData.gheePercent}%)</strong>
                  </div>
                  <div className="split-progress-track">
                    <div className="split-progress-fill ghee-fill" style={{ width: `${analyticsData.gheePercent}%` }}></div>
                  </div>
                  <span className="p-units-sold">{analyticsData.gheeSales} Jars Ordered</span>
                </div>

                {/* Khurjur Power Bomb */}
                <div className="product-split-row" style={{ marginTop: '1.25rem' }}>
                  <div className="product-split-labels">
                    <span className="p-name">খেজুরের পাওয়ার বোম্ব (Khurjur Bomb)</span>
                    <strong className="p-val">৳ {analyticsData.bombRevenue.toLocaleString()} ({analyticsData.bombPercent}%)</strong>
                  </div>
                  <div className="split-progress-track">
                    <div className="split-progress-fill bomb-fill" style={{ width: `${analyticsData.bombPercent}%` }}></div>
                  </div>
                  <span className="p-units-sold">{analyticsData.bombSales} Packs Ordered</span>
                </div>
              </div>
            </div>

            {/* Delivery & Payment Statistics */}
            <div className="analytics-card-widget">
              <div className="widget-header-row">
                <div>
                  <h3 className="widget-title">Delivery Geographic Split</h3>
                  <p className="widget-sub">Inside Dhaka vs Outside Dhaka</p>
                </div>
                <Truck size={18} color="#054231" />
              </div>

              <div className="geo-split-grid">
                <div className="geo-split-box inside-dhaka">
                  <span className="geo-title">ঢাকার ভেতরে (Inside Dhaka)</span>
                  <strong className="geo-count">{analyticsData.dhakaInside} Orders</strong>
                  <span className="geo-fee-tag">৳ ৭০ Express Charge</span>
                </div>

                <div className="geo-split-box outside-dhaka">
                  <span className="geo-title">ঢাকার বাইরে (Outside Dhaka)</span>
                  <strong className="geo-count">{analyticsData.dhakaOutside} Orders</strong>
                  <span className="geo-fee-tag">৳ ১৩০ Courier Charge</span>
                </div>
              </div>

              <div className="payment-ratio-gauge-wrap">
                <div className="payment-ratio-bar">
                  <div className="pay-segment-paid" style={{ width: `${Math.round((paidCount / (orders.length || 1)) * 100)}%` }}></div>
                </div>
                <div className="payment-ratio-legends">
                  <span>🟢 Paid ({paidCount})</span>
                  <span>⏳ COD Pending ({orders.length - paidCount})</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================
            TAB 3: GOOGLE SHEETS & EMAIL AUTOMATION
            ======================================================== */}
        {activeTab === 'automation' && (
          <div className="admin-automation-grid">
            {/* Left: Configuration Form */}
            <div className="automation-card">
              <div className="automation-card-header">
                <FileSpreadsheet size={24} color="#054231" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#054231' }}>
                    Google Sheets & Webhook Automation
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '2px' }}>
                    Customer orders automatically post into your Google Spreadsheet in real-time.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveSettings} className="automation-form-body">
                <div className="form-field-group">
                  <label className="ios-field-label">Google Apps Script Webhook URL</label>
                  <input 
                    type="url" 
                    className="ios-input-field" 
                    placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                    value={settings.googleSheetWebhookUrl}
                    onChange={(e) => setSettings({ ...settings, googleSheetWebhookUrl: e.target.value })}
                  />
                  <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                    Paste your active Web App URL ending with <code>/exec</code>.
                  </span>
                </div>

                <div className="form-field-group">
                  <label className="ios-field-label">Admin Notification Email</label>
                  <input 
                    type="email" 
                    className="ios-input-field" 
                    placeholder="admin@urmira.com"
                    value={settings.adminNotificationEmail}
                    onChange={(e) => setSettings({ ...settings, adminNotificationEmail: e.target.value })}
                  />
                </div>

                <div className="form-field-group" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <input 
                    type="checkbox" 
                    id="autoSendOnOrder"
                    checked={settings.autoSendOnOrder}
                    onChange={(e) => setSettings({ ...settings, autoSendOnOrder: e.target.checked })}
                    style={{ width: '18px', height: '18px', accentColor: '#054231' }}
                  />
                  <label htmlFor="autoSendOnOrder" style={{ fontSize: '0.88rem', fontWeight: '700', color: '#1f2937', cursor: 'pointer' }}>
                    Automatically send orders to Google Sheets upon placement
                  </label>
                </div>

                <div className="automation-btn-row">
                  <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem' }}>
                    {savedSettingsSuccess ? (
                      <>
                        <Check size={16} />
                        <span>Settings Saved!</span>
                      </>
                    ) : (
                      <span>Save Automation Settings</span>
                    )}
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-outline-green" 
                    onClick={handleTestWebhook}
                    disabled={!settings.googleSheetWebhookUrl}
                    style={{ padding: '0.75rem 1.25rem' }}
                  >
                    {testSent ? (
                      <>
                        <Check size={16} />
                        <span>Test Order Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>Send Test Order to Sheet</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Right: Copy-Paste Google Apps Script Code & Setup Steps */}
            <div className="automation-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#054231' }}>
                  Google Sheets Script Code
                </h4>
                <button 
                  className="btn-copy-script"
                  onClick={copyScriptCode}
                >
                  {copiedCode ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedCode ? 'Copied Code!' : 'Copy Script Code'}</span>
                </button>
              </div>

              <div className="setup-steps-list">
                <div className="setup-step-item">
                  <div className="step-number">1</div>
                  <div className="step-text">
                    Open your <strong>Google Sheet</strong> &gt; Click <strong>Extensions &gt; Apps Script</strong>.
                  </div>
                </div>

                <div className="setup-step-item">
                  <div className="step-number">2</div>
                  <div className="step-text">
                    Paste the script code below and click <strong>Save (Ctrl+S)</strong>.
                  </div>
                </div>

                <div className="setup-step-item">
                  <div className="step-number">3</div>
                  <div className="step-text">
                    Click <strong>Deploy &gt; New deployment &gt; Web App</strong>, select <em>Anyone</em> under "Who has access", and paste the Web App URL on the left!
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="script-code-box">
                <pre><code>{googleAppsScriptSnippet}</code></pre>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: SECURITY & PASSWORDS
            ======================================================== */}
        {activeTab === 'security' && (
          <div className="admin-automation-grid">
            <div className="automation-card" style={{ maxWidth: '520px' }}>
              <div className="automation-card-header">
                <ShieldCheck size={24} color="#054231" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#054231' }}>
                    Admin Password & Security
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#6e6e73' }}>
                    Change your admin username and password anytime to keep your order database completely private and secured.
                  </p>
                </div>
              </div>

              <form onSubmit={handleUpdateCredentials} className="automation-form-body">
                <div className="form-field-group">
                  <label className="ios-field-label">Admin Username</label>
                  <input 
                    type="text" 
                    className="ios-input-field" 
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field-group">
                  <label className="ios-field-label">New Password</label>
                  <input 
                    type="text" 
                    className="ios-input-field" 
                    placeholder="Enter new password..."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '0.8rem' }}>
                  {credsSaved ? (
                    <>
                      <Check size={16} />
                      <span>Username & Password Updated!</span>
                    </>
                  ) : (
                    <span>Update Credentials</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 1-Page Printable Invoice Modal */}
        {selectedOrderForInvoice && (
          <InvoiceModal 
            order={selectedOrderForInvoice} 
            onClose={() => setSelectedOrderForInvoice(null)} 
          />
        )}
      </div>
    </div>
  );
}

export default AdminOrders;
