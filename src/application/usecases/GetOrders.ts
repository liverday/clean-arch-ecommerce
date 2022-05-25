import OrderRepository from "@domain/repositories/OrderRepository";

export default class GetOrders {
  constructor(readonly orderRepository: OrderRepository) { }

  async execute(): Promise<Output[]> {
    const orders = await this.orderRepository.findAll();

    return orders.map(order => ({
      code: order.code.code,
      total: order.getTotal()
    }))
  }
}

type Output = {
  code: string,
  total: number
}