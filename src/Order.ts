import Coupon from "./Coupon";
import Cpf from "./Cpf";
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
  readonly cpf: Cpf;  
  private items: OrderItem[] = [];
  coupon?: Coupon;
  
  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }

  addItem(item: Item, quantity: number) {
    this.items.push(new OrderItem(item, quantity));
  }

  addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  getTotal(): number {
    let total = this.items.reduce((accumulator, current) => {
      return accumulator + current.getTotal();
    }, 0);

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }

    return total
  }
}