import Coupon from '../src/Coupon';

test('should create a coupon', () => {
  const coupon = new Coupon('VALE20', 20);
  expect(coupon.calculateDiscount(100)).toBe(20);
})