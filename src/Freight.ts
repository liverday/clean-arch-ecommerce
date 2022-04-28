import Item from "./Item";


export default class Freight {
  private MIN_FARE = 10
  private DISTANCE = 1000;
  private fare: number = 0;

  addItem(item: Item, quantity: number) {
    this.fare += (item.getVolume() * this.DISTANCE * (item.getDensity() / 100)) * quantity
  }

  getTotal() {
    if (this.fare <= this.MIN_FARE) {
      return this.MIN_FARE;
    }

    return this.fare;
  }
}