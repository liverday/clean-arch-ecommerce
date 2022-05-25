import OrderCode from "@domain/entity/OrderCode";
import OrderCoupon from "@domain/entity/OrderCoupon";
import OrderItem from "@domain/entity/OrderItem";
import DomainEvent from "./DomainEvent";

export default class OrderPlaced implements DomainEvent {
  name: string = 'OrderPlaced';
  
  constructor(
    readonly code: OrderCode, 
    readonly orderItems: OrderItem[], 
    readonly freight: number, 
    readonly total: number, 
    readonly coupon?: OrderCoupon
  ) { }
}