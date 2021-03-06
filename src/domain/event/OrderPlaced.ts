import Order from "@domain/entity/Order";
import DomainEvent from "./DomainEvent";

export default class OrderPlaced implements DomainEvent {
  name: string = 'OrderPlaced';
  
  constructor(
    readonly order: Order
  ) { }
}