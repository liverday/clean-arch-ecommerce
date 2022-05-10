import SimulateFreight from "@application/SimulateFreight";
import Dimension from "@domain/entity/Dimension";
import Item from "@domain/entity/Item";
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";

test('should simulate an order freight', async () => {
  const itemRepository = new InMemoryItemRepository();
  itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1));
  const simulateFreight = new SimulateFreight(itemRepository);
  const input = {
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 }
    ]
  }

  const { total } = await simulateFreight.execute(input);
  expect(total).toBe(260);
})