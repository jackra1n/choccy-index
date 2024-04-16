
export class Product {
  constructor(
    public brandName: string,
    public productName: string,
    public price: number,
    public quantity: number,
    public image: File | null,
    public rating: number
  ) {}
}