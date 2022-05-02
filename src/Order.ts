import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Freight from "./Freight";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  readonly cpf: Cpf;
  private items: OrderItem[] = [];
  coupon?: Coupon;
  private freight: Freight = new Freight();

  constructor(cpf: string, readonly issueDate: Date = new Date()) {
    this.cpf = new Cpf(cpf);
  }

  addItem(item: Item, quantity: number) {
    this.freight.addItem(item, quantity);
    this.items.push(new OrderItem(item, quantity));
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.issueDate)) return;
    this.coupon = coupon;
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