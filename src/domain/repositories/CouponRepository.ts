import Coupon from "@domain/entity/Coupon";

export default interface CouponRepository {
  findByCode(code: string): Promise<Coupon>
  save(coupon: Coupon): Promise<Coupon>
}