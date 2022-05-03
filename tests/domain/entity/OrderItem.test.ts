import Item from "@domain/entity/Item";
import OrderItem from "@domain/entity/OrderItem";

test('should be able to create an order item', () => {
  const orderItem = new OrderItem(new Item(1, 'Guitarra', 500), 10);
  expect(orderItem.getTotal()).toBe(5000);
  expect(orderItem.item.idItem).toBe(1);
  expect(orderItem.item.description).toBe('Guitarra');
  expect(orderItem.item.price).toBe(500);
  expect(orderItem.quantity).toBe(10);
})