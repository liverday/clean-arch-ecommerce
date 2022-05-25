import SubtractItemQuantityHandler from "@application/usecases/handlers/SubtractItemQuantityHandler";
import Handler from "@application/usecases/handlers/Handler";
import Item from "@domain/entity/Item";
import Order from "@domain/entity/Order";
import OrderPlaced from "@domain/event/OrderPlaced";
import StockEntryRepository from "@domain/repositories/StockEntryRepository";
import InMemoryStockEntryRepository from "@infra/repositories/memory/InMemoryStockEntryRepository";

let stockEntryRepository: StockEntryRepository;
let subtractItemQuantityHandler: Handler 

beforeEach(() => {
  stockEntryRepository = new InMemoryStockEntryRepository();
  subtractItemQuantityHandler = new SubtractItemQuantityHandler(stockEntryRepository);
})

test('should be able to add quantity when an order was canceled', async () => {
  const itemOne = new Item(1, 'Guitarra', 500, 25);
  const itemTwo = new Item(2, 'Cabo', 30, 50);
  const order = new Order("44976087867");
  order.addItem(itemOne, 10);
  order.addItem(itemTwo, 3);

  await subtractItemQuantityHandler.handle(new OrderPlaced(order));
  
  const entries = await stockEntryRepository.findAll();
  
  expect(entries).toHaveLength(2);
  expect(entries[0].idItem).toBe(1);
  expect(entries[0].operation).toBe('out');
  expect(entries[0].quantity).toBe(10)
  ;
  expect(entries[1].idItem).toBe(2);
  expect(entries[1].operation).toBe('out');
  expect(entries[1].quantity).toBe(3);
})