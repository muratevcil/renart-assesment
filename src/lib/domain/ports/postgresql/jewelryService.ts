import { Jewelry } from '../../entities/jewelry';

interface FilterOptions {
  priceRange?: {
    min?: number;
    max?: number;
  };
  popularityScoreRange?: {
    min?: number;
    max?: number;
  };
}

export interface JewelryServicePort {
  getAllJewelry(filterOptions?: FilterOptions): Promise<Jewelry[]>;
  getJewelryById(id: number): Promise<Jewelry | null>;
  createJewelry(jewelryData: {
    name: string;
    weight: number;
    imageUrls: string[];
    popularityScore: number;
  }): Promise<Jewelry>;
  updateJewelry(id: number, jewelry: Partial<Omit<Jewelry, 'id' | 'price'>>): Promise<Jewelry | null>;
  deleteJewelry(id: number): Promise<boolean>;
}
