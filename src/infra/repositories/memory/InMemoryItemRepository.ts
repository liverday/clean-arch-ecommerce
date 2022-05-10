import Item from "@domain/entity/Item";
import ItemRepository from "@domain/repositories/ItemRepository";

export default class InMemoryItemRepository implements ItemRepository {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  async findById(id: number): Promise<Item> {
    const item = this.items.find(item => item.idItem === id);

    if (!item) {
      throw new Error('Item not found')
    }

    return item;
  }

  async save(item: Item): Promise<Item> {
    this.items.push(item);
    return item;
  }

  async findAll(): Promise<Item[]> {
    return this.items;
  }
}