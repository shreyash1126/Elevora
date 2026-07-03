const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static directories
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Serve specific static asset files
app.get('/products.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
});
app.get('/woocommerce_products.csv', (req, res) => {
  res.sendFile(path.join(__dirname, 'woocommerce_products.csv'));
});

// Helper to send HTML files
const serveHtml = (fileName) => (req, res) => {
  res.sendFile(path.join(__dirname, fileName));
};

// Route mapping for clean URLs
const routes = {
  '/': 'index.html',
  '/index': 'index.html',
  '/index.html': 'index.html',
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/blog': 'blog.html',
  '/blog.html': 'blog.html',
  '/blog-details': 'blog-details.html',
  '/blog-details.html': 'blog-details.html',
  '/cart': 'cart.html',
  '/cart.html': 'cart.html',
  '/checkout': 'checkout.html',
  '/checkout.html': 'checkout.html',
  '/contact': 'contact.html',
  '/contact.html': 'contact.html',
  '/faq': 'faq.html',
  '/faq.html': 'faq.html',
  '/my-account': 'my-account.html',
  '/my-account.html': 'my-account.html',
  '/order-success': 'order-success.html',
  '/order-success.html': 'order-success.html',
  '/privacy-policy': 'privacy-policy.html',
  '/privacy-policy.html': 'privacy-policy.html',
  '/product': 'product.html',
  '/product.html': 'product.html',
  '/refund-policy': 'refund-policy.html',
  '/refund-policy.html': 'refund-policy.html',
  '/return-policy': 'return-policy.html',
  '/return-policy.html': 'return-policy.html',
  '/shipping-policy': 'shipping-policy.html',
  '/shipping-policy.html': 'shipping-policy.html',
  '/shop': 'shop.html',
  '/shop.html': 'shop.html',
  '/terms': 'terms.html',
  '/terms.html': 'terms.html',
  '/track-order': 'track-order.html',
  '/track-order.html': 'track-order.html',
  '/wishlist': 'wishlist.html',
  '/wishlist.html': 'wishlist.html',
};

// Apply route mappings
Object.entries(routes).forEach(([routePath, fileName]) => {
  app.get(routePath, serveHtml(fileName));
});

// Wildcard fallback: check if request matches any specific .html file dynamically
app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (page.endsWith('.html')) {
    res.sendFile(path.join(__dirname, page), (err) => {
      if (err) next();
    });
  } else {
    res.sendFile(path.join(__dirname, `${page}.html`), (err) => {
      if (err) next();
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
