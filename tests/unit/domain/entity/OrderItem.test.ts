import OrderItem from "@domain/entity/OrderItem";

test('should be able to create an order item', () => {
  const orderItem = new OrderItem(1, 500, 10);
  expect(orderItem.getTotal()).toBe(5000);
  expect(orderItem.idItem).toBe(1);
  expect(orderItem.price).toBe(500);
  expect(orderItem.quantity).toBe(10);
})