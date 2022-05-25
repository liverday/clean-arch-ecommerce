import SubtractItemQuantityHandler from "@application/usecases/handlers/SubtractItemQuantityHandler";
import Handler from "@application/usecases/handlers/Handler";
import Item from "@domain/entity/Item";
import Order from "@domain/entity/Order";
import OrderPlaced from "@domain/event/OrderPlaced";
import ItemRepository from "@domain/repositories/ItemRepository"
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";

let itemRepository: ItemRepository;
let subtractItemQuantityHandler: Handler 

beforeEach(() => {
  itemRepository = new InMemoryItemRepository();
  subtractItemQuantityHandler = new SubtractItemQuantityHandler(itemRepository);
})

test('should be able to add quantity when an order was canceled', async () => {
  const itemOne = new Item(1, 'Guitarra', 500, 25);
  const itemTwo = new Item(2, 'Cabo', 30, 50);
  await itemRepository.save(itemOne);
  await itemRepository.save(itemTwo);
  const order = new Order("44976087867");
  order.addItem(itemOne, 10);
  order.addItem(itemTwo, 3);

  await subtractItemQuantityHandler.handle(new OrderPlaced(order.code, order.items, order.getFreight(), order.getTotal(), order.coupon));
  
  expect(itemOne.getQuantity()).toBe(15);
  expect(itemTwo.getQuantity()).toBe(47);
})