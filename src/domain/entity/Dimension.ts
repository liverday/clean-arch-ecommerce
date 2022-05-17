export default class Dimension {
  constructor(readonly width: number, readonly height: number, readonly length: number) {
    if (this.width < 0 || this.height < 0 || this.length < 0) {
      throw new Error('A negative value is not valid to a dimension unit')
    } 
  }

  calculateVolume() {
    return this.width / 100 * this.height / 100 * this.length / 100;
  }
}