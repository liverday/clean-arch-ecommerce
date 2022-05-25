import OrderPlaced from "@domain/event/OrderPlaced";
import ItemRepository from "@domain/repositories/ItemRepository";
import Handler from "./Handler";

export default class AddItemQuantityHandler implements Handler {
  eventName: string = 'OrderCanceled';

  constructor(private itemRepository: ItemRepository) {}

  async handle({ orderItems }: OrderPlaced): Promise<void> {
    for (const orderItem of orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      item.addQuantity(orderItem.quantity);
      await this.itemRepository.save(item);
    }
  }
  
}