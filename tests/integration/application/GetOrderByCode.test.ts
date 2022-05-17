import InMemoryOrderRepository from "@infra/repositories/memory/InMemoryOrderRepository";
import Order from '@domain/entity/Order';
import Item from "@domain/entity/Item";
import Dimension from "@domain/entity/Dimension";
import GetOrderByCode from "@application/GetOrderByCode";

test('should be able to get an order by code', async () => {
  const orderRepository = new InMemoryOrderRepository();
  const order = new Order("44976087867", new Date('2022-05-17T13:00:00.000'));
  order.addItem(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10), 3), 1)
  order.addItem(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50), 20), 1)
  order.addItem(new Item(3, "Cabo", 30, new Dimension(10, 10, 10), 1), 3)
  await orderRepository.save(order);

  const getOrderByCode = new GetOrderByCode(orderRepository);
  const output = await getOrderByCode.execute("202200000001");
  
  expect(output.code).toBe('202200000001');
  expect(output.total).toBe(6350)
})

test('should reject a not found order request', async () => {
  const orderRepository = new InMemoryOrderRepository();
  const getOrderByCode = new GetOrderByCode(orderRepository);
  await expect(() => getOrderByCode.execute('202200000001')).rejects.toThrow(new Error('Order not found'))
})