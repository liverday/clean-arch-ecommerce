import StockEntry from "@domain/entity/StockEntry";

test('should create a valid StockEntry', () => {
  const stockEntry = new StockEntry(1, 'in', 10);
  expect(stockEntry.idItem).toBe(1);
  expect(stockEntry.operation).toBe('in');
  expect(stockEntry.quantity).toBe(10);
})