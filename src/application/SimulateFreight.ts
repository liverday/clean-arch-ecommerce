import Freight from "@domain/entity/Freight";
import ItemRepository from "@domain/repositories/ItemRepository";

export default class SimulateFreight {
  constructor(readonly itemRepository: ItemRepository) { }

  async execute({ orderItems }: Input): Promise<Output> { 
    const freight = new Freight();

    for (const orderItem of orderItems) {
      const item = await this.itemRepository.findById(orderItem.idItem);
      freight.addItem(item, orderItem.quantity);
    }

    return {
      total: freight.getTotal()
    }
  }
}

type InputOrderItem = { 
  idItem: number
  quantity: number
}

type Input = {
  orderItems: InputOrderItem[]
}

type Output = {
  total: number
}