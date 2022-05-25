import GetOrders from "@application/usecases/GetOrders";
import Dimension from "@domain/entity/Dimension";
import Item from "@domain/entity/Item";
import Order from "@domain/entity/Order";
import InMemoryOrderRepository from "@infra/repositories/memory/InMemoryOrderRepository"

test('should be able to list all orders', async () => {
  const ordersRepository = new InMemoryOrderRepository();

  const orderOne = new Order("44976087867", new Date('2022-05-17T13:00:00.000'));
  orderOne.addItem(new Item(1, "Guitarra", 1000, 10, new Dimension(100, 30, 10), 3), 1)

  const orderTwo = new Order("44976087867", new Date('2022-05-17T13:00:00.000'));
  orderTwo.addItem(new Item(1, "Guitarra", 1000, 10, new Dimension(100, 30, 10), 3), 5)

  const orderThree = new Order("44976087867", new Date('2022-05-17T13:00:00.000'));
  orderThree.addItem(new Item(1, "Guitarra", 1000, 10, new Dimension(100, 30, 10), 3), 10)

  await Promise.all([
    ordersRepository.save(orderOne),
    ordersRepository.save(orderTwo),
    ordersRepository.save(orderThree)
  ])

  const getOrders = new GetOrders(ordersRepository);

  const output = await getOrders.execute();
  expect(output).toHaveLength(3);
})