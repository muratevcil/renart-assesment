export interface Jewelry {
  id: number;
  name: string;
  weight: number;
  imageUrls: string[];
  popularityScore: number;
  price: number;
}

export class JewelryEntity implements Jewelry {
  id: number;
  name: string;
  weight: number;
  imageUrls: string[];
  popularityScore: number;
  price: number;

  constructor(data: Omit<Jewelry, 'price'>, currentGoldPrice: number) {
    this.id = data.id;
    this.name = data.name;
    this.weight = data.weight;
    this.imageUrls = data.imageUrls;
    this.popularityScore = data.popularityScore;
    this.price = (this.popularityScore + 1) * this.weight * currentGoldPrice;
  }
}
