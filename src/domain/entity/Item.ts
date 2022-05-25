import Dimension from "./Dimension";

export default class Item {
  constructor(
    readonly idItem: number, 
    readonly description: string, 
    readonly price: number,
    private quantity: number,
    readonly dimension?: Dimension,
    readonly weight?: number,
    ) { 
      if (this.weight && this.weight < 0) {
        throw new Error('A negative value is not allowed to item weight');
      }
    }
    
    getVolume() {
      if (!this.dimension) return 0;
      
      return this.dimension.calculateVolume();
  }

  getDensity() {
    if (!this.dimension || !this.weight) return 0;
    
    return this.weight / this.dimension.calculateVolume();
  }

  getQuantity(): number {
    return this.quantity;
  }
  
  subtractQuantity(quantity: number) {
    this.quantity -= quantity;
  }

  addQuantity(quantity: number) {
    this.quantity += quantity;
  }
}