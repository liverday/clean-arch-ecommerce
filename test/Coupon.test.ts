import Coupon from '../src/Coupon';

test('should create a coupon', () => {
  const coupon = new Coupon('VALE20', 20);
  expect(coupon.calculateDiscount(100)).toBe(20);
})

test('should not create a coupon that is expired', () => {
  const coupon = new Coupon('EXPIRADO10', 10, new Date('2022-05-02T13:00:00.000'))
  expect(coupon.isExpired(new Date('2022-05-02T14:00:00.000'))).toBe(true) 
})

test('a coupon that expire date was not defined should return false to isExpired', () => {
  const coupon = new Coupon('VALE10', 10);
  expect(coupon.isExpired()).toBe(false);
})