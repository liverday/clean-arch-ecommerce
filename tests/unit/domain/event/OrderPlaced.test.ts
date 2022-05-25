import Item from "@domain/entity/Item"
import Order from "@domain/entity/Order"
import OrderPlaced from "@domain/event/OrderPlaced"

test('should create an OrderPlaced event', () => {
  const order = new Order('44976087867')
  order.addItem(new Item(1, 'Guitarra', 500, 1), 1);
  order.addItem(new Item(2, 'Cabo', 30, 1), 2);
  const orderPlaced = new OrderPlaced(order.code, order.items, order.getFreight(), order.getTotal(), order.coupon);

  expect(orderPlaced.code.code).toBe('202200000001');
  expect(orderPlaced.freight).toBe(0);
  expect(orderPlaced.name).toBe('OrderPlaced');
  expect(orderPlaced.orderItems).toHaveLength(2);
  expect(orderPlaced.total).toBe(560);
})