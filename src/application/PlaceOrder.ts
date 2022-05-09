import Order from "@domain/entity/Order";
import ItemRepository from "@domain/repositories/ItemRepository";
import OrderRepository from "@domain/repositories/OrderRepository";

export default class PlaceOrder {
  constructor(private itemRepository: ItemRepository, private orderRepository: OrderRepository) {}

  async execute (input: Input): Promise<Output> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.findById(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
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
  coupon?: string
}

type Output = {
  total: number
}