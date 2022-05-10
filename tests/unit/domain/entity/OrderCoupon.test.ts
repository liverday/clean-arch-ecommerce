import Coupon from "@domain/entity/Coupon";
import OrderCoupon from "@domain/entity/OrderCoupon";

test('should create a coupon', () => {
  const coupon = new Coupon('VALE20', 20);
  const orderCoupon = new OrderCoupon(coupon.code, coupon.value);
  expect(orderCoupon.calculateDiscount(100)).toBe(20);
})