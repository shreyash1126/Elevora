// js/dashboard.js
// Dashboard controller: Manages tab visibility, User Profile details, Order summaries,
// Loyalty Points, Seller inventory/product additions, and Admin analytical summaries.

// Default accounts data if not initialized
const initialUserProfile = {
  name: "Shreyash Pandey",
  email: "shreyashpandey1126@gmail.com",
  phone: "+91 98765 43210",
  address: "123 Tech Avenue, Sector 62, Noida, UP, India",
  joined: "July 2026",
  balance: 320.00, // wallet
  points: 1540 // loyalty points
};

const initialOrdersList = [
  { id: "EV-847294", date: "2026-07-10", status: "Delivered", total: 199.99, items: "AeroPulse Headphones (Matte Black)" },
  { id: "EV-623910", date: "2026-07-12", status: "In Transit", total: 64.98, items: "GaNCharge 100W multi-port block" }
];

document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('my-account-page')) return;
  
  initDashboardState();
  initDashboardTabs();
  initSellerForm();
  initAdminDashboard();
});

// Load profiles, orders, and stats from localStorage
function initDashboardState() {
  if (!localStorage.getItem('elevora_user')) {
    localStorage.setItem('elevora_user', JSON.stringify(initialUserProfile));
  }
  if (!localStorage.getItem('elevora_orders')) {
    localStorage.setItem('elevora_orders', JSON.stringify(initialOrdersList));
  }

  renderUserProfile();
  renderUserOrders();
  renderWalletDetails();
}

// 1. Dashboard Tab Toggling
function initDashboardTabs() {
  const tabs = document.querySelectorAll('.dashboard-tab-btn');
  const sections = document.querySelectorAll('.dashboard-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = tab.getAttribute('data-target');
      
      // Update Tab active state styling
      tabs.forEach(t => t.classList.remove('bg-blue-600', 'text-white', 'shadow-md'));
      tab.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      
      // Toggle visibility
      sections.forEach(sec => {
        if (sec.id === targetId) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });
    });
  });
}

// 2. User Profile Rendering & Updates
function renderUserProfile() {
  const user = JSON.parse(localStorage.getItem('elevora_user'));
  if (!user) return;

  const nameInput = document.getElementById('profile-name-input');
  const emailInput = document.getElementById('profile-email-input');
  const phoneInput = document.getElementById('profile-phone-input');
  const addressInput = document.getElementById('profile-address-input');

  if (nameInput) nameInput.value = user.name;
  if (emailInput) emailInput.value = user.email;
  if (phoneInput) phoneInput.value = user.phone;
  if (addressInput) addressInput.value = user.address;

  // Render text readouts
  const userDisplayFields = document.querySelectorAll('.user-display-name');
  userDisplayFields.forEach(el => el.innerText = user.name);

  const userEmailFields = document.querySelectorAll('.user-display-email');
  userEmailFields.forEach(el => el.innerText = user.email);

  const userJoinedFields = document.querySelectorAll('.user-display-joined');
  userJoinedFields.forEach(el => el.innerText = `Member Since: ${user.joined}`);
}

// Save Profile handler
function saveProfileChanges(e) {
  if (e) e.preventDefault();
  const nameVal = document.getElementById('profile-name-input').value;
  const emailVal = document.getElementById('profile-email-input').value;
  const phoneVal = document.getElementById('profile-phone-input').value;
  const addressVal = document.getElementById('profile-address-input').value;

  const user = JSON.parse(localStorage.getItem('elevora_user')) || {};
  user.name = nameVal;
  user.email = emailVal;
  user.phone = phoneVal;
  user.address = addressVal;

  localStorage.setItem('elevora_user', JSON.stringify(user));
  renderUserProfile();
  showNotification('Profile updated successfully', 'success');
}

// 3. User Orders Rendering
function renderUserOrders() {
  const orders = JSON.parse(localStorage.getItem('elevora_orders')) || [];
  const container = document.getElementById('orders-table-body');
  if (!container) return;

  container.innerHTML = '';
  if (orders.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500">No orders found.</td></tr>`;
    return;
  }

  orders.forEach(order => {
    let statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
    if (order.status === 'Delivered') statusClass = 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
    if (order.status === 'Cancelled') statusClass = 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';

    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition';
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-800 dark:text-white">${order.id}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">${order.date}</td>
      <td class="px-6 py-4 text-sm text-slate-800 dark:text-slate-200 truncate max-w-xs">${order.items}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800 dark:text-white">$${order.total.toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-sm">
        <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">${order.status}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-right text-xs">
        <a href="/track-order?id=${order.id}" class="text-blue-500 hover:text-blue-600 font-bold mr-3">Track</a>
        <a href="#" onclick="showNotification('Invoice PDF downloading...', 'info'); return false;" class="text-gray-500 hover:text-gray-700 dark:hover:text-white">Invoice</a>
      </td>
    `;
    container.appendChild(tr);
  });
}

// 4. Wallet & Loyalty Program Rendering
function renderWalletDetails() {
  const user = JSON.parse(localStorage.getItem('elevora_user'));
  if (!user) return;

  const walletVal = document.getElementById('wallet-balance');
  const pointsVal = document.getElementById('loyalty-points');

  if (walletVal) walletVal.innerText = `$${user.balance.toFixed(2)}`;
  if (pointsVal) pointsVal.innerText = user.points;
}

// 5. Seller Dashboard Controls
function initSellerForm() {
  const form = document.getElementById('seller-add-product-form');
  if (!form) return;

  renderSellerProducts();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('seller-product-name').value;
    const category = document.getElementById('seller-product-category').value;
    const price = parseFloat(document.getElementById('seller-product-price').value);
    const stock = parseInt(document.getElementById('seller-product-stock').value);
    const description = document.getElementById('seller-product-desc').value;

    const newProd = {
      id: Date.now(),
      name,
      category,
      brand: 'VoltMax', // default mock seller brand
      price,
      oldPrice: price * 1.25,
      rating: 5.0,
      reviewsCount: 0,
      badge: 'Seller Product',
      badgeType: 'new',
      description,
      images: [
        "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80"
      ],
      colors: ["Black"],
      variants: [{ color: "Black", stock: stock }],
      specs: { "Seller Direct": "Authentic Item" },
      features: ["Verified by Elevora Quality Standard"]
    };

    // Save to local custom products list
    let sellerProducts = JSON.parse(localStorage.getItem('elevora_seller_products') || '[]');
    sellerProducts.push(newProd);
    localStorage.setItem('elevora_seller_products', JSON.stringify(sellerProducts));

    form.reset();
    showNotification('Product listed on Elevora successfully!', 'success');
    renderSellerProducts();
  });
}

function renderSellerProducts() {
  const container = document.getElementById('seller-inventory-table');
  if (!container) return;

  let sellerProducts = JSON.parse(localStorage.getItem('elevora_seller_products') || '[]');
  container.innerHTML = '';

  if (sellerProducts.length === 0) {
    container.innerHTML = `<tr><td colspan="5" class="px-6 py-4 text-center text-gray-500 text-sm">No custom listings active. Use the form above to add a product.</td></tr>`;
    return;
  }

  sellerProducts.forEach(prod => {
    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-100 dark:border-slate-800 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition';
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap font-bold text-slate-800 dark:text-white">${prod.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${prod.category}</td>
      <td class="px-6 py-4 whitespace-nowrap font-semibold">$${prod.price.toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-center">${prod.variants[0].stock}</td>
      <td class="px-6 py-4 whitespace-nowrap text-right">
        <button onclick="deleteSellerProduct(${prod.id})" class="text-red-500 hover:text-red-600 font-bold">Remove</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

function deleteSellerProduct(id) {
  let sellerProducts = JSON.parse(localStorage.getItem('elevora_seller_products') || '[]');
  sellerProducts = sellerProducts.filter(p => p.id !== id);
  localStorage.setItem('elevora_seller_products', JSON.stringify(sellerProducts));
  renderSellerProducts();
  showNotification('Listing removed', 'info');
}

// 6. Admin Panel Dashboard Controls
function initAdminDashboard() {
  const container = document.getElementById('admin-customers-table');
  if (!container) return;

  const mockCustomers = [
    { name: "Rahul Verma", email: "rahul@outlook.com", orders: 4, spent: 549.95, status: "Active" },
    { name: "Jessica Alba", email: "jess@gmail.com", orders: 12, spent: 2310.40, status: "Active" },
    { name: "John Doe", email: "john@yahoo.com", orders: 1, spent: 49.99, status: "Suspended" }
  ];

  if (!localStorage.getItem('elevora_admin_customers')) {
    localStorage.setItem('elevora_admin_customers', JSON.stringify(mockCustomers));
  }

  renderAdminCustomers();
}

function renderAdminCustomers() {
  const container = document.getElementById('admin-customers-table');
  if (!container) return;

  const customers = JSON.parse(localStorage.getItem('elevora_admin_customers')) || [];
  container.innerHTML = '';

  customers.forEach((cust, idx) => {
    const statusClass = cust.status === 'Active' ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600';
    const tr = document.createElement('tr');
    tr.className = 'border-b border-gray-100 dark:border-slate-800 text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition';
    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap font-semibold">${cust.name}</td>
      <td class="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">${cust.email}</td>
      <td class="px-6 py-4 whitespace-nowrap text-center">${cust.orders}</td>
      <td class="px-6 py-4 whitespace-nowrap font-semibold">$${cust.spent.toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap text-center">
        <button onclick="toggleCustomerStatus(${idx})" class="font-bold ${statusClass}">${cust.status}</button>
      </td>
    `;
    container.appendChild(tr);
  });
}

function toggleCustomerStatus(idx) {
  const customers = JSON.parse(localStorage.getItem('elevora_admin_customers')) || [];
  if (customers[idx]) {
    customers[idx].status = customers[idx].status === 'Active' ? 'Suspended' : 'Active';
    localStorage.setItem('elevora_admin_customers', JSON.stringify(customers));
    renderAdminCustomers();
    showNotification(`Customer status set to ${customers[idx].status}`, 'info');
  }
}
