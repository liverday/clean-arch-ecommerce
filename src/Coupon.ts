export default class Coupon { 
  constructor (readonly code: string, readonly value: number) { }

  calculateDiscount(total: number): number {
    return (this.value / 100) * total;
  }
}