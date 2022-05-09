import Dimension from "@domain/entity/Dimension"

test('should calculate a volume based on dimensions', () => {
  const dimension = new Dimension(20, 15, 10);
  expect(dimension.calculateVolume()).toBe(0.003);
})