import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderCoupon from "./OrderCoupon";
import OrderItem from "./OrderItem";

export default class Order {
  readonly cpf: Cpf;
  private items: OrderItem[] = [];
  coupon?: OrderCoupon;
  private freight: Freight = new Freight();
  readonly code: OrderCode

  constructor(cpf: string, readonly issueDate: Date = new Date(), sequence: number = 1) {
    this.cpf = new Cpf(cpf);
    this.code = new OrderCode(issueDate, sequence);
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity);
    this.items.push(new OrderItem(item.idItem, item.price, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) return;
    this.coupon = new OrderCoupon(coupon.code, coupon.value);
  }

  getFreight(): number {
    return this.freight.getTotal();
  }

  getTotal(): number {
    let total = this.items.reduce((accumulator, current) => {
      return accumulator + current.getTotal();
    }, 0);

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }
    
    total += this.getFreight();

    return total
  }
}