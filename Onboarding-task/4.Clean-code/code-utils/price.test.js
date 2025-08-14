const { calcTotal, TAX_RATE, SHIPPING_FEE } = require('./price');

describe('calcTotal', () => {
  test('calculates total for typical cart', () => {
    const items = [
      { price: 12, qty: 2 },
      { price: 5, qty: 1 },
    ];
    const subtotal = 12 * 2 + 5 * 1; // 29
    const expected = +(subtotal + subtotal * TAX_RATE + SHIPPING_FEE).toFixed(2);
    expect(calcTotal(items)).toBe(expected);
  });

  test('empty cart still charges only shipping', () => {
    const expected = +(0 + 0 * TAX_RATE + SHIPPING_FEE).toFixed(2);
    expect(calcTotal([])).toBe(expected);
  });

  test('throws for invalid items', () => {
    expect(() => calcTotal([{ price: 'x', qty: 1 }])).toThrow(TypeError);
    expect(() => calcTotal('not-an-array')).toThrow(TypeError);
  });

  test('rounds to 2 decimals', () => {
    const items = [{ price: 0.1, qty: 3 }]; // 0.30 subtotal
    const subtotal = 0.3;
    const expected = +(subtotal + subtotal * TAX_RATE + SHIPPING_FEE).toFixed(2);
    expect(calcTotal(items)).toBe(expected);
  });
});
