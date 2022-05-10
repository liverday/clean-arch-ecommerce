export default class OrderCoupon {
  constructor(readonly code: string, readonly percentage: number) { }

  calculateDiscount(total: number): number {
    return (this.percentage / 100) * total;
  }
}