export class Order {
  totalQuantity: number;
  totalPrice: number;

  constructor(
    totalQuantity?: number,
    totalPrice?: number
  ) {
    this.totalQuantity = totalQuantity || 0;
    this.totalPrice = totalPrice || 0;
  }
}
