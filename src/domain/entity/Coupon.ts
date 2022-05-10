export default class Coupon { 
  constructor (readonly code: string, readonly value: number, readonly expiresAt?: Date) { 
  }
  
  isExpired(today: Date = new Date()) {
    if (!this.expiresAt) {
      return false;
    }

    return this.expiresAt.getTime() < today.getTime() 
  }
}