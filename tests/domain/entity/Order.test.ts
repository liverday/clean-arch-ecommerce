import Coupon from "@domain/entity/Coupon";
import Dimension from "@domain/entity/Dimension";
import Item from "@domain/entity/Item";
import Order from "@domain/entity/Order";

test('Should not create an ordert wtih invalid CPF', () => {
  expect(() => new Order('111.111.111-11')).toThrow(new Error('CPF Inválido'));
});

test('Should be able to create an Order with 3 items with description, price and quantity', () => {
  const order = new Order('449.760.878.67');
  order.addItem(new Item(1, "Guitarra", 10), 500)
  order.addItem(new Item(2, "Amplificador", 2), 2000)
  order.addItem(new Item(3, "Violao", 1), 300)
  expect(order.getTotal()).toBe(9300);
})

test('Should be able to create an Order with discount coupon (percentage of total value)', () => {
  const order = new Order('449.760.878.67', new Date('2022-05-01T13:00:00.000'));
  order.addItem(new Item(1, 'Guitarra', 10), 500);
  order.addCoupon(new Coupon('VALE50', 50, new Date('2022-05-02T13:00:00.000')));
  expect(order.getTotal()).toBe(2500);
})

test('Should not add coupon when coupon is expired', () => {
  const order = new Order('449.760.878.67');
  order.addItem(new Item(1, 'Guitarra', 10), 500);
  order.addCoupon(new Coupon('VALE50', 50, new Date('2022-05-02T13:00:00.000')));

  expect(order.coupon).toBeFalsy();
  expect(order.getTotal()).toBe(5000)
});

test('should be able to calculate freight when able to it', () => {
  const order = new Order('449.760.878.67', new Date('2022-05-01T13:00:00.000'));
  order.addItem(new Item(1, 'Guitarra', 500, new Dimension(100, 30, 10), 3), 1);
  order.addItem(new Item(1, 'Câmera', 30, new Dimension(20, 15, 10), 1), 1);
  expect(order.getFreight()).toBe(40);
  expect(order.getTotal()).toBe(570)
})