import Item from "@domain/entity/Item";

export default interface ItemRepository {
  findById(id: number): Promise<Item>;
  save(item: Item): Promise<Item>;
  findAll(): Promise<Item[]>
}