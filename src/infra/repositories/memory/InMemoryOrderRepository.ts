import Order from "@domain/entity/Order";
import OrderRepository from "@domain/repositories/OrderRepository";

export default class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[]
  constructor() {
    this.orders = [];
  }
  
  async save(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  async count(): Promise<number> {
    return this.orders.length;
  }
}