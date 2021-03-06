import Dimension from '@domain/entity/Dimension';
import Item from '@domain/entity/Item';

test('should create an item', () => {
  const item = new Item(1, 'Guitarra', 500, 1);
  expect(item.idItem).toBe(1);
  expect(item.description).toBe('Guitarra');
  expect(item.price).toBe(500);
  expect(item.getQuantity()).toBe(1);
})

test('should be able to calculate volume based on its dimensions', () => {
  const item = new Item(1, 'Guitarra', 500, 1, new Dimension(100, 30, 10))
  expect(item.dimension).toBeTruthy();
  expect(item.getVolume()).toBe(0.03);
})

test('should be able to calculate density based on its dimensions and weight', () => {
  const item = new Item(1, 'Guitarra', 500, 1, new Dimension(100, 30, 10), 3)
  expect(item.dimension).toBeTruthy();
  expect(item.getDensity()).toBe(100);
})

test('should get 0 volume for a item without dimensions', () => {
  const item = new Item(1, 'Guitarra', 500, 1);
  expect(item.getVolume()).toBe(0);
  expect(item.dimension).toBeFalsy();
})

test('should get 0 volume for a item without dimensions or without weight', () => {
  const item = new Item(1, 'Guitarra', 500, 1);
  expect(item.getDensity()).toBe(0);
  expect(item.dimension).toBeFalsy();
  expect(item.weight).toBeFalsy();
})

test('should thrown an error when an item weight is negative', () => {
  expect(() => new Item(1, 'Guitarra', 500, 1, new Dimension(100, 30, 10), -1)).toThrow(new Error('A negative value is not allowed to item weight'));
})

test('should be able to add quantity to an item', () => {
  const item = new Item(1, 'Guitarra', 500, 15);
  item.addQuantity(15);
  expect(item.getQuantity()).toBe(30);
})

test('should be able to subtract quantity from an item', () => {
  const item = new Item(1, 'Guitarra', 500, 15);
  item.subtractQuantity(15);
  expect(item.getQuantity()).toBe(0);
})