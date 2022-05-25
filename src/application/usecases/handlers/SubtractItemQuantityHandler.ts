import OrderPlaced from "@domain/event/OrderPlaced";
import ItemRepository from "@domain/repositories/ItemRepository";
import Handler from "./Handler";

export default class SubtractItemQuantityHandler implements Handler {
  eventName: string = 'OrderPlaced';

  constructor(private itemsRepository: ItemRepository) { }

  async handle({ orderItems }: OrderPlaced): Promise<void> {
    for (const orderItem of orderItems) {
      const item = await this.itemsRepository.findById(orderItem.idItem);
      item.subtractQuantity(orderItem.quantity);
      await this.itemsRepository.save(item);
    }
  }
  
}