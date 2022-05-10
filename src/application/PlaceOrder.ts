import Order from "@domain/entity/Order";
import CouponRepository from "@domain/repositories/CouponRepository";
import ItemRepository from "@domain/repositories/ItemRepository";
import OrderRepository from "@domain/repositories/OrderRepository";

export default class PlaceOrder {
  constructor(
    private itemRepository: ItemRepository, 
    private orderRepository: OrderRepository, 
    private couponRepository: CouponRepository
  ) {}

  async execute (input: Input): Promise<Output> {
    const sequence = await this.orderRepository.count();
		const order = new Order(input.cpf, input.date, sequence);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.findById(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
    if (input.coupon) {
      const coupon = await this.couponRepository.findByCode(input.coupon);
      order.addCoupon(coupon);
    }
		const savedOrder = await this.orderRepository.save(order);
		const total = savedOrder.getTotal();
		return {
			total
		}
	}
}

type InputOrderItem = { 
  idItem: number
  quantity: number
}

type Input = {
  cpf: string,
  orderItems: InputOrderItem[],
  coupon?: string,
  date: Date
}

type Output = {
  total: number
}