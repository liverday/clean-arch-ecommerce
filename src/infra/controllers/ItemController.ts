import GetItems from "@application/usecases/GetItems";
import ItemRepository from "@domain/repositories/ItemRepository";
import Http, { OK_RESPONSE } from "@infra/http/Http";

export default class ItemController {
  constructor(http: Http, itemRepository: ItemRepository) {
    http.on("get", "/items", async () => {
      const getItems = new GetItems(itemRepository)
      const data = await getItems.execute();

      return {
        data,
        status: OK_RESPONSE 
      }
    });
  }
}