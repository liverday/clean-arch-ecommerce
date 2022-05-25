import Dimension from "@domain/entity/Dimension";
import GetItems from "@application/usecases/GetItems";
import Item from "@domain/entity/Item";
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";

test("should fetch the items", async () => {
	const itemRepository = new InMemoryItemRepository();
	itemRepository.save(new Item(1, "Guitarra", 1000, 10, new Dimension(100, 30, 10), 3));
	itemRepository.save(new Item(2, "Amplificador", 5000, 10, new Dimension(50, 50, 50), 20));
	itemRepository.save(new Item(3, "Cabo", 30, 10, new Dimension(10, 10, 10), 1));
	const getItems = new GetItems(itemRepository);
	const output = await getItems.execute();
	expect(output).toHaveLength(3);
});
