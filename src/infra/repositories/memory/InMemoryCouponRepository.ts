import Coupon from "@domain/entity/Coupon";
import CouponRepository from "@domain/repositories/CouponRepository";

export default class InMemoryCouponRepository implements CouponRepository {
  private coupons: Coupon[];
  constructor () {
    this.coupons = []
  }
  async findByCode(code: string): Promise<Coupon> {
    const coupon = this.coupons.find(coupon => coupon.code === code);
    if (!coupon) {
      throw new Error('Coupon not found');
    }
    return coupon
  }

  async save(coupon: Coupon): Promise<Coupon> {
    this.coupons.push(coupon);
    return coupon;
  }
}