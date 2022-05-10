import OrderCode from "@domain/entity/OrderCode";

test('should generate an order code', () => {
  const orderCode = new OrderCode(new Date('2022-05-09T12:00:00.000'), 10);
  expect(orderCode.code).toBe('202200000010');
})