import { addDays, subDays } from 'date-fns';
import Coupon from '../src/Coupon';

test('should create a coupon', () => {
  const coupon = new Coupon('VALE20', 20, addDays(new Date(), 1));
  expect(coupon.calculateDiscount(100)).toBe(20);
})

test('should not create a coupon that is expired', () => {
  const coupon = new Coupon('EXPIRADO10', 10, subDays(new Date(), 1))
  expect(coupon.isExpired(new Date())).toBe(true) 
})

test('a coupon that expire date was not defined should return false to isExpired', () => {
  const coupon = new Coupon('VALE10', 10);
  expect(coupon.isExpired()).toBe(false);
})