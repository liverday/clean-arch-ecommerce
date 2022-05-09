import Dimension from '@domain/entity/Dimension';
import Item from '@domain/entity/Item';

test('should create an item', () => {
  const item = new Item(1, 'Guitarra', 500);
  expect(item.idItem).toBe(1);
  expect(item.description).toBe('Guitarra');
  expect(item.price).toBe(500);
})

test('should be able to calculate volume based on its dimensions', () => {
  const item = new Item(1, 'Guitarra', 500, new Dimension(100, 30, 10))
  expect(item.dimension).toBeTruthy();
  expect(item.getVolume()).toBe(0.03);
})

test('should be able to calculate density based on its dimensions and weight', () => {
  const item = new Item(1, 'Guitarra', 500, new Dimension(100, 30, 10), 3)
  expect(item.dimension).toBeTruthy();
  expect(item.getDensity()).toBe(100);
})

test('should get 0 volume for a item without dimensions', () => {
  const item = new Item(1, 'Guitarra', 500);
  expect(item.getVolume()).toBe(0);
  expect(item.dimension).toBeFalsy();
})

test('should get 0 volume for a item without dimensions or without weight', () => {
  const item = new Item(1, 'Guitarra', 500);
  expect(item.getDensity()).toBe(0);
  expect(item.dimension).toBeFalsy();
  expect(item.weight).toBeFalsy();
})