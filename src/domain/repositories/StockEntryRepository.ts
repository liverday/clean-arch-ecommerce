import StockEntry from "@domain/entity/StockEntry";

export default interface StockEntryRepository {
  findAll(): Promise<StockEntry[]>;
  findAllById(idItem: number): Promise<StockEntry[]>;
  save(stockEntry: StockEntry): Promise<StockEntry>;
}