import Order from "@domain/entity/Order";
import DomainEvent from "./DomainEvent";

export default class OrderCanceled implements DomainEvent {
  name: string = 'OrderCanceled';
  
  constructor(
    readonly order: Order
  ) { }
}