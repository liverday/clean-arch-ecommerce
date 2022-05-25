import StockEntry from "@domain/entity/StockEntry";
import StockEntryRepository from "@domain/repositories/StockEntryRepository";

export default class InMemoryStockEntryRepository implements StockEntryRepository {
  private entries: StockEntry[] = [];
  
  async findAll(): Promise<StockEntry[]> {
    return this.entries;
  }
  async findAllById(idItem: number): Promise<StockEntry[]> {
    return this.entries.filter(entry => entry.idItem === idItem);
  }
  async save(stockEntry: StockEntry): Promise<StockEntry> {
    this.entries.push(stockEntry);
    return stockEntry;
  }
}