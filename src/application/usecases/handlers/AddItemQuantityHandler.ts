import StockEntry from "@domain/entity/StockEntry";
import OrderPlaced from "@domain/event/OrderPlaced";
import StockEntryRepository from "@domain/repositories/StockEntryRepository";
import Handler from "./Handler";

export default class AddItemQuantityHandler implements Handler {
  eventName: string = 'OrderCanceled';

  constructor(private stockEntryRepository: StockEntryRepository) {}

  async handle(event: OrderPlaced): Promise<void> {
    for (const orderItem of event.order.items) {
      await this.stockEntryRepository.save(new StockEntry(orderItem.idItem, 'in', orderItem.quantity));
    }
  }
  
}