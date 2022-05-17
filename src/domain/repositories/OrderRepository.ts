import Order from "@domain/entity/Order";

export default interface OrderRepository {
  save(order: Order): Promise<Order>;
  findByCode(code: string): Promise<Order | undefined>;
  count(): Promise<number>;
  findAll(): Promise<Order[]>;
}