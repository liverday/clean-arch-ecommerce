import Dimension from "@domain/entity/Dimension"

test('should calculate a volume based on dimensions', () => {
  const dimension = new Dimension(20, 15, 10);
  expect(dimension.calculateVolume()).toBe(0.003);
})

test('should be able to reject if a dimension unit is negative', () => {
  expect(() => new Dimension(-1, 10, 10)).toThrow(new Error('A negative value is not valid to a dimension unit'))
})