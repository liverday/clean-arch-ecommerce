import OrderRepository from "@domain/repositories/OrderRepository";

export default class GetOrderByCode {
  constructor(readonly orderRepository: OrderRepository) { }
  async execute(code: string): Promise<Output> {
    const order = await this.orderRepository.findByCode(code);

    if (!order) {
      throw new Error('Order not found')
    }

    return {
      code: order.code.code,
      total: order.getTotal()
    }
  }
}

type Output = {
  code: string,
  total: number
}