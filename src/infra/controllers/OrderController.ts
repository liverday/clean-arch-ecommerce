import GetOrderByCode from "@application/usecases/GetOrderByCode";
import GetOrders from "@application/usecases/GetOrders";
import OrderRepository from "@domain/repositories/OrderRepository";
import Http, { OK_RESPONSE } from "@infra/http/Http";

export default class OrderController {
  constructor(http: Http, ordersRepository: OrderRepository) {
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
  }
}