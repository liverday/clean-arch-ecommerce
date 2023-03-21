import Item from "@domain/entity/Item"
import Order from "@domain/entity/Order"
import OrderCanceled from "@domain/event/OrderCanceled"

test('should create an OrderCanceled event', () => {
  const order = new Order('44976087867', new Date(2022, 1, 1, 0, 0, 0))
  order.addItem(new Item(1, 'Guitarra', 500, 1), 1);
  order.addItem(new Item(2, 'Cabo', 30, 1), 2);
  const orderCanceled = new OrderCanceled(order);

  expect(orderCanceled.order.code.code).toBe('202200000001');
  expect(orderCanceled.order.getFreight()).toBe(0);
  expect(orderCanceled.name).toBe('OrderCanceled');
  expect(orderCanceled.order.items).toHaveLength(2);
  expect(orderCanceled.order.getTotal()).toBe(560);
})