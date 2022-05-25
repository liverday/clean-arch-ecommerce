import StockEntry from "@domain/entity/StockEntry"
import StockEntryRepository from "@domain/repositories/StockEntryRepository";
import InMemoryStockEntryRepository from "@infra/repositories/memory/InMemoryStockEntryRepository";

let repository: StockEntryRepository

beforeEach(() => {
  repository = new InMemoryStockEntryRepository();
})

test('should save a stock entry', async () => {
  const stockEntry = new StockEntry(1, 'in', 10);
  await repository.save(stockEntry);

  const entries = await repository.findAll();
  expect(entries).toHaveLength(1);
  expect(entries[0].idItem).toBe(1)
  expect(entries[0].operation).toBe('in')
  expect(entries[0].quantity).toBe(10)
})

test('should be able to find all entries', async () => {
  await repository.save(new StockEntry(1, 'in', 10));
  await repository.save(new StockEntry(1, 'in', 15));
  await repository.save(new StockEntry(1, 'out', 12));
  await repository.save(new StockEntry(1, 'out', 5));

  const entries = await repository.findAll();
  expect(entries).toHaveLength(4);
})

test('should be able to find all entries by a given item id', async () => {
  await repository.save(new StockEntry(1, 'in', 10));
  await repository.save(new StockEntry(2, 'in', 15));
  await repository.save(new StockEntry(3, 'out', 12));
  await repository.save(new StockEntry(3, 'out', 5));

  const entriesById = await repository.findAllById(3);
  expect(entriesById).toHaveLength(2);
})