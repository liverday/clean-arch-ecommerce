import ValidateCoupon from "@application/ValidateCoupon";
import Coupon from "@domain/entity/Coupon";
import InMemoryCouponRepository from "@infra/repositories/memory/InMemoryCouponRepository"

test('should validate an expired coupon', async () => {
  const couponRepository = new InMemoryCouponRepository();
  couponRepository.save(new Coupon('VALE20', 20, new Date('2022-05-09T12:00:00.000')));

  const validateCoupon = new ValidateCoupon(couponRepository);
  const { isExpired } = await validateCoupon.execute({
    code: 'VALE20',
    date: new Date('2022-05-10T12:00:00.000')
  })
  expect(isExpired).toBeTruthy();
})

test('should validate a valid coupon', async () => {
  const couponRepository = new InMemoryCouponRepository();
  couponRepository.save(new Coupon('VALE20', 20, new Date('2022-05-09T12:00:00.000')));

  const validateCoupon = new ValidateCoupon(couponRepository);
  const { isExpired } = await validateCoupon.execute({
    code: 'VALE20',
    date: new Date('2022-05-8T12:00:00.000')
  })
  expect(isExpired).toBeFalsy();
})

test('should throw an error when coupon was not found', async () => {
  const couponRepository = new InMemoryCouponRepository();

  const validateCoupon = new ValidateCoupon(couponRepository);
  await expect(validateCoupon.execute({
    code: 'VALE20',
    date: new Date('2022-05-8T12:00:00.000')
  })).rejects.toThrow(new Error('Coupon not found'));
})