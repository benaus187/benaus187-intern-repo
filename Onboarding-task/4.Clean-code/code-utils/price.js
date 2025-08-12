// price.js
const TAX_RATE = 0.10;
const SHIPPING_FEE = 4.99;

function calcTotal(items) {
  if (!Array.isArray(items)) throw new TypeError('items must be an array');
  const subtotal = items.reduce((sum, it) => {
    if (!it || typeof it.price !== 'number' || typeof it.qty !== 'number') {
      throw new TypeError('each item needs numeric price and qty');
    }
    return sum + it.price * it.qty;
  }, 0);
  const tax = subtotal * TAX_RATE;
  return +(subtotal + tax + SHIPPING_FEE).toFixed(2); // 2dp currency
}

module.exports = { calcTotal, TAX_RATE, SHIPPING_FEE };
