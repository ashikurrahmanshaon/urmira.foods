// LocalStorage Database & Automation Webhook Handler for Urmira.com Orders

const ORDERS_KEY = 'urmira_orders_db';
const SETTINGS_KEY = 'urmira_automation_settings';
const AUTH_KEY = 'urmira_admin_credentials';
const SESSION_KEY = 'urmira_admin_session';

// Default Admin Credentials
const DEFAULT_CREDENTIALS = {
  username: 'urmi',
  password: 'urmi30072800'
};

// Admin Authentication Management
export const getAdminCredentials = () => {
  try {
    const data = localStorage.getItem(AUTH_KEY);
    if (!data) {
      localStorage.setItem(AUTH_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      return DEFAULT_CREDENTIALS;
    }
    const parsed = JSON.parse(data);
    if (parsed.username === 'admin') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(DEFAULT_CREDENTIALS));
      return DEFAULT_CREDENTIALS;
    }
    return parsed;
  } catch {
    return DEFAULT_CREDENTIALS;
  }
};

export const updateAdminCredentials = (username, password) => {
  const newCreds = { username: username.trim(), password: password.trim() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(newCreds));
  return newCreds;
};

export const isAdminAuthenticated = () => {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
};

export const loginAdmin = (username, password) => {
  const creds = getAdminCredentials();
  if (username.trim() === creds.username && password.trim() === creds.password) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return { success: true };
  }
  return { success: false, message: 'ভুল ইউজারনেম অথবা পাসওয়ার্ড!' };
};

export const logoutAdmin = () => {
  sessionStorage.removeItem(SESSION_KEY);
};

// Initial dummy orders if database is empty
const INITIAL_SAMPLE_ORDERS = [
  {
    orderId: 'URM-591043',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    customerName: 'Ashikur Rahman Shaon',
    customerPhone: '01712345678',
    customerAddress: 'House 14, Road 5, Dhanmondi, Dhaka',
    deliveryZone: 'inside',
    deliveryFee: 70,
    cartItems: [
      { id: 1, name: 'Pure Cow Ghee (খাঁটি গাওয়া ঘি)', price: 1200, quantity: 1, unit: '500g' }
    ],
    subtotal: 1200,
    grandTotal: 1270,
    orderStatus: 'Pending',
    paymentStatus: 'Pending (COD)',
    paymentMethod: 'Cash on Delivery'
  },
  {
    orderId: 'URM-382910',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    customerName: 'Tanvir Ahmed',
    customerPhone: '01898765432',
    customerAddress: 'Agrabad C/A, Chittagong',
    deliveryZone: 'outside',
    deliveryFee: 130,
    cartItems: [
      { id: 2, name: 'Khurjur Power Bomb (খেজুরের পাওয়ার বোম্ব)', price: 850, quantity: 2, unit: '500g' }
    ],
    subtotal: 1700,
    grandTotal: 1830,
    orderStatus: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Cash on Delivery'
  }
];

// Global 24/7 Real-Time Cloud Database Endpoint for Urmira.com
const CLOUD_DB_ENDPOINT = 'https://urmira-cloud-default-rtdb.firebaseio.com/orders.json';

// Fetch all orders from Cloud Database across all devices
export const fetchCloudOrders = async () => {
  try {
    const res = await fetch(CLOUD_DB_ENDPOINT, { cache: 'no-cache' });
    if (!res.ok) throw new Error('Cloud fetch failed');
    const data = await res.json();
    if (!data) return [];
    
    // Firebase returns either an array or an object map
    let cloudList = [];
    if (Array.isArray(data)) {
      cloudList = data.filter(Boolean);
    } else if (typeof data === 'object') {
      cloudList = Object.values(data);
    }

    // Sort latest first
    cloudList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    // Save to local cache
    if (cloudList.length > 0) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(cloudList));
    }
    return cloudList;
  } catch (err) {
    console.warn('Cloud DB fetch fallback to localStorage:', err);
    return getOrders();
  }
};

export const getOrders = () => {
  try {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_SAMPLE_ORDERS));
      return INITIAL_SAMPLE_ORDERS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading orders from localStorage', err);
    return INITIAL_SAMPLE_ORDERS;
  }
};

export const saveOrder = async (orderData) => {
  try {
    const newOrder = {
      ...orderData,
      orderId: orderData.orderId || 'URM-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: orderData.createdAt || new Date().toISOString(),
      orderStatus: orderData.orderStatus || 'Pending',
      paymentStatus: orderData.paymentStatus || 'Pending (COD)',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery'
    };

    // 1. Save to LocalStorage immediately
    const currentOrders = getOrders();
    const updated = [newOrder, ...currentOrders.filter(o => o.orderId !== newOrder.orderId)];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

    // 2. Save directly to 24/7 Global Cloud Database (Firebase RTDB REST)
    try {
      const orderCloudKey = newOrder.orderId.replace(/[^a-zA-Z0-9]/g, '_');
      const singleOrderUrl = `https://urmira-cloud-default-rtdb.firebaseio.com/orders/${orderCloudKey}.json`;
      
      await fetch(singleOrderUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      console.log('Order successfully synced to 24/7 Cloud DB:', newOrder.orderId);
    } catch (cloudErr) {
      console.warn('Cloud DB sync error (offline fallback saved):', cloudErr);
    }

    // 3. Send to Google Sheets Automation Webhook if configured
    sendWebhookAutomation(newOrder);

    return newOrder;
  } catch (err) {
    console.error('Error saving order', err);
    return orderData;
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  const currentOrders = getOrders();
  let changedOrder = null;
  const updated = currentOrders.map(order => {
    if (order.orderId === orderId) {
      const isDelivered = newStatus === 'Delivered';
      changedOrder = {
        ...order,
        orderStatus: newStatus,
        paymentStatus: isDelivered ? 'Paid' : order.paymentStatus
      };
      return changedOrder;
    }
    return order;
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

  // Sync updated status to Cloud DB
  if (changedOrder) {
    try {
      const orderCloudKey = orderId.replace(/[^a-zA-Z0-9]/g, '_');
      await fetch(`https://urmira-cloud-default-rtdb.firebaseio.com/orders/${orderCloudKey}.json`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus, paymentStatus: changedOrder.paymentStatus })
      });
    } catch (e) {
      console.warn('Cloud status update error:', e);
    }
    sendWebhookAutomation(changedOrder);
  }

  return updated;
};

export const updatePaymentStatus = async (orderId, newStatus) => {
  const currentOrders = getOrders();
  const updated = currentOrders.map(order => {
    if (order.orderId === orderId) {
      return { ...order, paymentStatus: newStatus };
    }
    return order;
  });
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

  // Sync to Cloud DB
  try {
    const orderCloudKey = orderId.replace(/[^a-zA-Z0-9]/g, '_');
    await fetch(`https://urmira-cloud-default-rtdb.firebaseio.com/orders/${orderCloudKey}.json`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentStatus: newStatus })
    });
  } catch (e) {
    console.warn('Cloud payment update error:', e);
  }

  return updated;
};

export const deleteOrder = async (orderId) => {
  const currentOrders = getOrders();
  const updated = currentOrders.filter(order => order.orderId !== orderId);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));

  // Delete from Cloud DB
  try {
    const orderCloudKey = orderId.replace(/[^a-zA-Z0-9]/g, '_');
    await fetch(`https://urmira-cloud-default-rtdb.firebaseio.com/orders/${orderCloudKey}.json`, {
      method: 'DELETE'
    });
  } catch (e) {
    console.warn('Cloud delete error:', e);
  }

  return updated;
};

// Automation Settings (Google Sheets & Email Webhook)
const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbzytvxJSOegDDZH0IOM3ULQFkXy70vcBUMKhRDr9_id-arpIG_fDv1u1j3QgNZO44Xq3A/exec';

export const getAutomationSettings = () => {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (!data) {
      const defaultSettings = {
        googleSheetWebhookUrl: DEFAULT_WEBHOOK_URL,
        adminNotificationEmail: 'admin@urmira.com',
        autoSendOnOrder: true
      };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
      return defaultSettings;
    }
    const parsed = JSON.parse(data);
    if (!parsed.googleSheetWebhookUrl) {
      parsed.googleSheetWebhookUrl = DEFAULT_WEBHOOK_URL;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return { googleSheetWebhookUrl: DEFAULT_WEBHOOK_URL, adminNotificationEmail: 'admin@urmira.com', autoSendOnOrder: true };
  }
};

export const saveAutomationSettings = (settings) => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const sendWebhookAutomation = async (order) => {
  const settings = getAutomationSettings();
  if (!settings.googleSheetWebhookUrl || !settings.autoSendOnOrder) return;

  try {
    const itemsList = order.cartItems 
      ? order.cartItems.map(i => `${i.name} (x${i.quantity})`).join(', ') 
      : 'N/A';

    const payload = {
      orderId: order.orderId,
      date: new Date(order.createdAt || Date.now()).toLocaleString('en-US'),
      customerName: order.customerName,
      customerPhone: order.customerPhone,
      customerAddress: order.customerAddress,
      items: itemsList,
      subtotal: order.subtotal || 0,
      deliveryFee: order.deliveryFee || 0,
      totalAmount: order.grandTotal || 0,
      orderStatus: order.orderStatus || 'Pending',
      paymentStatus: order.paymentStatus || 'Pending (COD)',
      paymentMethod: order.paymentMethod || 'Cash on Delivery',
      adminEmail: settings.adminNotificationEmail || ''
    };

    // Google Apps Script Web App works reliably with simple text/plain POST
    await fetch(settings.googleSheetWebhookUrl.trim(), {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify(payload)
    });
    
    console.log('Order successfully dispatched to Google Sheets Webhook:', payload.orderId);
  } catch (error) {
    console.warn('Webhook dispatch error:', error);
  }
};
