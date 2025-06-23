let cart = [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  updateCartIcon();
}

function updateCartIcon() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

function toggleCartPopup() {
  const popup = document.getElementById('cart-popup');
  popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const line = document.createElement('div');
    line.textContent = `${item.name} x${item.qty} - ₦${item.price * item.qty}`;
    container.appendChild(line);
    total += item.price * item.qty;
  });
  document.getElementById('cart-total').textContent = 'Total: ₦' + total;
}

function clearCart() {
  cart = [];
  updateCartIcon();
  renderCart();
}

function searchProducts() {
  const term = document.getElementById('search-input').value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.getAttribute('data-name').toLowerCase();
    card.style.display = name.includes(term) ? 'block' : 'none';
  });
}

function filterCategory(cat) {
  document.querySelectorAll('.product-card').forEach(card => {
    const category = card.getAttribute('data-category');
    card.style.display = (cat === 'all' || category === cat) ? 'block' : 'none';
  });
}

function goToCheckout() {
  localStorage.setItem('checkoutCart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
}

function proceedToWhatsApp() {
  const items = JSON.parse(localStorage.getItem('checkoutCart') || '[]');
  if (items.length === 0) return;

  let message = 'Hello, I want to order:%0A';
  let total = 0;

  items.forEach(item => {
    message += `- ${item.qty}x ${item.name} (₦${item.qty * item.price})%0A`;
    total += item.qty * item.price;
  });

  message += `%0ATotal: ₦${total}`;
  const phone = '2349057089582';
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}