export default class OrderCode {
  readonly code: string;
  
  constructor(date: Date, orderNumber: number) {
    const year = date.getFullYear();
    this.code = `${year}${String(orderNumber).padStart(8, '0')}`
  }
}