import Order from "@domain/entity/Order";

export default interface OrderRepository {
  save(order: Order): Promise<Order>
  count(): Promise<number>;
}