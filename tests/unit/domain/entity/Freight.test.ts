import Dimension from "@domain/entity/Dimension";
import Freight from "@domain/entity/Freight";
import Item from "@domain/entity/Item";

test('should calculate freight value based on the items dimensions', () => {
  const freight = new Freight();

  freight.addItem(new Item(1, 'Guitarra', 500, 10, new Dimension(100, 30, 10), 3), 1);

  expect(freight.getTotal()).toBe(30);
})

test('should apply min fare to a freight that total dont surpass it', () => {
  const freight = new Freight();

  freight.addItem(new Item(1, 'Câmera', 30, 10, new Dimension(20, 15, 10), 1), 1);

  expect(freight.getTotal()).toBe(10);
})