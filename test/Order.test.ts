import Coupon from "../src/Coupon";
import Item from "../src/Item";
import Order from "../src/Order";

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
  const order = new Order('449.760.878.67');
  order.addItem(new Item(1, 'Guitarra', 10), 500);
  order.addCoupon(new Coupon('VALE50', 50));
  expect(order.getTotal()).toBe(2500);
})