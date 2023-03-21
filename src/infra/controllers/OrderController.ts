import GetOrderByCode from "@application/usecases/GetOrderByCode";
import GetOrders from "@application/usecases/GetOrders";
import PlaceOrder from "@application/usecases/PlaceOrder";
import CouponRepository from "@domain/repositories/CouponRepository";
import ItemRepository from "@domain/repositories/ItemRepository";
import OrderRepository from "@domain/repositories/OrderRepository";
import Http, { OK_RESPONSE, CREATED_RESPONSE } from "@infra/http/Http";
import Mediator from "@infra/mediator/Mediator";

export default class OrderController {
  constructor(
    http: Http, 
    ordersRepository: OrderRepository,
    itemsRepository: ItemRepository,
    couponsRepository: CouponRepository,
    mediator: Mediator
  ) {
    http.on("get", "/orders", async () => {
      const getOrders = new GetOrders(ordersRepository)
      const data = await getOrders.execute();

      return {
        data,
        status: OK_RESPONSE 
      }
    });

    http.on("get", "/orders/{code}", async ({ params }) => {
      const { code } = params;
      const getOrderByCode = new GetOrderByCode(ordersRepository);
      const data = await getOrderByCode.execute(code);

      return {
        data,
        status: OK_RESPONSE
      }
    })

    http.on("post", "/orders", async ({ body }) => {
      const { cpf, items, coupon } = body;

      const placeOrder = new PlaceOrder(
        itemsRepository, 
        ordersRepository, 
        couponsRepository, 
        mediator
      )

      const data = await placeOrder.execute({
        cpf, 
        orderItems: items,
        coupon,
        date: new Date()
      })

      return {
        data,
        status: CREATED_RESPONSE
      }
    })
  }
}