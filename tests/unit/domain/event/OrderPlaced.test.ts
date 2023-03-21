import Item from "@domain/entity/Item"
import Order from "@domain/entity/Order"
import OrderPlaced from "@domain/event/OrderPlaced"

test('should create an OrderPlaced event', () => {
  const order = new Order('44976087867', new Date('2022-01-01T00:00:00.000'))
  order.addItem(new Item(1, 'Guitarra', 500, 1), 1);
  order.addItem(new Item(2, 'Cabo', 30, 1), 2);
  const orderPlaced = new OrderPlaced(order);

  expect(orderPlaced.order.code.code).toBe('202200000001');
  expect(orderPlaced.order.getFreight()).toBe(0);
  expect(orderPlaced.name).toBe('OrderPlaced');
  expect(orderPlaced.order.items).toHaveLength(2);
  expect(orderPlaced.order.getTotal()).toBe(560);
})