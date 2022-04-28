export default class Coupon { 
  constructor (readonly code: string, readonly value: number, readonly expiresAt?: Date) { 
  }

  calculateDiscount(total: number): number {
    return (this.value / 100) * total;
  }

  isExpired(today: Date = new Date()) {
    if (!this.expiresAt) {
      return false;
    }

    return this.expiresAt.getTime() < today.getTime() 
  }
}