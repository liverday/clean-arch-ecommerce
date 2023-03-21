import request from 'supertest';

import Dimension from "@domain/entity/Dimension";
import Item from "@domain/entity/Item";
import ItemRepository from "@domain/repositories/ItemRepository";
import OrderRepository from "@domain/repositories/OrderRepository";
import ItemController from "@infra/controllers/ItemController";
import OrderController from "@infra/controllers/OrderController";
import ExpressHttpAdapter from "@infra/http/ExpressHttpAdapter";
import Http from "@infra/http/Http";
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";
import InMemoryOrderRepository from "@infra/repositories/memory/InMemoryOrderRepository";
import Order from '@domain/entity/Order';

let itemRepository: ItemRepository
let orderRepository: OrderRepository
let http: Http

beforeEach(() => {
  http = new ExpressHttpAdapter();
  itemRepository = new InMemoryItemRepository();
  orderRepository = new InMemoryOrderRepository();
  new ItemController(http, itemRepository);
  new OrderController(http, orderRepository);
});

test('should respond /items', async () => {
  await itemRepository.save(new Item(1, "Guitarra", 500, 10, new Dimension(100, 30, 10), 10))
  await itemRepository.save(new Item(2, "Amplificador", 5000, 10, new Dimension(50, 50, 50), 20));
  await itemRepository.save(new Item(3, "Cabo", 30, 10, new Dimension(10, 10, 10), 1));

  const { status, body } = await request(http.app)
    .get("/items")
  
  expect(status).toBe(200)
  expect(body).toHaveLength(3);
})

test('should respond /orders', async () => {
  const orderOne = new Order("44976087867", new Date('2022-01-01T00:00:00.000'));
  orderOne.addItem(new Item(2, "Amplificador", 500, 10, new Dimension(50, 50, 50)), 20);

  const orderTwo = new Order("44976087867", new Date('2022-01-01T00:00:00.000'), 2);
  orderTwo.addItem(new Item(1, "Guitarra", 500, 10, new Dimension(100, 30, 10)), 3);
  await orderRepository.save(orderOne);
  await orderRepository.save(orderTwo);

  const { status, body } = await request(http.app)
    .get("/orders")

  expect(status).toBe(200);
  expect(body).toHaveLength(2);

  expect(body[0].code).toBe("202200000001")
  expect(body[0].total).toBe(10000)

  expect(body[1].code).toBe("202200000002")
  expect(body[1].total).toBe(1500)
})

test('should respond /orders/{code}', async () => {
  const orderOne = new Order("44976087867", new Date('2022-01-01T00:00:00.000'), 1345);
  orderOne.addItem(new Item(2, "Amplificador", 500, 10, new Dimension(50, 50, 50)), 20);
  await orderRepository.save(orderOne);

  const { status, body } = await request(http.app)
    .get("/orders/202200001345")

  expect(status).toBe(200);
  expect(body.code).toBe("202200001345")
  expect(body.total).toBe(10000);
})

