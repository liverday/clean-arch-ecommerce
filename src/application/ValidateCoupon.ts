import CouponRepository from "@domain/repositories/CouponRepository";

export default class ValidateCoupon {
  constructor(private couponRepository: CouponRepository) { }

  async execute({ code, date }: Input): Promise<Output> {
    const coupon = await this.couponRepository.findByCode(code);

    return {
      isExpired: coupon.isExpired(date)
    }
  }
}

type Input = {
  code: string,
  date: Date
}

type Output = {
  isExpired: boolean
}