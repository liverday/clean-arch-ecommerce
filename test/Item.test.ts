import Item from '../src/Item';

test('should create an item', () => {
  const item = new Item(1, 'Guitarra', 500);
  expect(item.idItem).toBe(1);
  expect(item.description).toBe('Guitarra');
  expect(item.price).toBe(500);
})