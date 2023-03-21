import ItemController from "@infra/controllers/ItemController";
import OrderController from "@infra/controllers/OrderController";
import InMemoryMediatorAdapter from "@infra/mediator/InMemoryMediatorAdapter";
import InMemoryCouponRepository from "@infra/repositories/memory/InMemoryCouponRepository";
import InMemoryItemRepository from "@infra/repositories/memory/InMemoryItemRepository";
import InMemoryOrderRepository from "@infra/repositories/memory/InMemoryOrderRepository";
import ExpressHttpAdapter from "./infra/http/ExpressHttpAdapter";

const http = new ExpressHttpAdapter();

const itemRepository = new InMemoryItemRepository();
const orderRepository = new InMemoryOrderRepository();
const couponRepository = new InMemoryCouponRepository();
const mediator = new InMemoryMediatorAdapter();

const _ = new ItemController(http, itemRepository);
const _2 = new OrderController(
  http, 
  orderRepository, 
  itemRepository, 
  couponRepository, 
  mediator
);

http.listen(3000);
