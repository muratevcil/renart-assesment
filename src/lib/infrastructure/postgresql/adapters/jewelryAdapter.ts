import { JewelryServicePort } from '../../../domain/ports/postgresql/jewelryService';
import { Jewelry, JewelryEntity } from '../../../domain/entities/jewelry';
import { prisma } from '../prisma';
import { GoldApiManager } from '../../goldapi/goldApiAdapter';

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

export class JewelryManager implements JewelryServicePort {
  private static instance: JewelryManager;

  private constructor() {}

  public static getInstance(): JewelryManager {
    if (!JewelryManager.instance) {
      JewelryManager.instance = new JewelryManager();
    }
    return JewelryManager.instance;
  }

  public static parseFilterOptions(searchParams: URLSearchParams): FilterOptions {
    const filterOptions: FilterOptions = {};

    // Parse price filter
    const priceFilter = searchParams.get('price');
    if (priceFilter) {
      const parts = priceFilter.split('-');
      const min = Number(parts[0]);
      const max = parts[1] === '+' ? undefined : Number(parts[1]);
      filterOptions.priceRange = { min, max };
    }

    // Parse popularity filter
    const popularityFilter = searchParams.get('popularity');
    if (popularityFilter) {
      const [min, max] = popularityFilter.split('-').map(Number);
      filterOptions.popularityScoreRange = { min, max };
    }

    return filterOptions;
  }

  async getAllJewelry(filterOptionsOrSearchParams?: FilterOptions | URLSearchParams): Promise<Jewelry[]> {
    let filterOptions: FilterOptions | undefined = undefined;
    if (filterOptionsOrSearchParams instanceof URLSearchParams) {
      filterOptions = JewelryManager.parseFilterOptions(filterOptionsOrSearchParams);
    } else {
      filterOptions = filterOptionsOrSearchParams;
    }
    try {
      // Build where conditions for filtering
      const whereConditions: any = {};

      // Apply popularity score filter at database level
      if (filterOptions?.popularityScoreRange) {
        const { min, max } = filterOptions.popularityScoreRange;
        if (min !== undefined && max !== undefined) {
          whereConditions.popularityScore = {
            gte: min,
            lte: max
          };
        } else if (min !== undefined) {
          whereConditions.popularityScore = {
            gte: min
          };
        } else if (max !== undefined) {
          whereConditions.popularityScore = {
            lte: max
          };
        }
      }

      const jewelries = await prisma.jewelry.findMany({
        where: whereConditions
      });

      const currentGoldPrice = await GoldApiManager.getInstance().getGoldPrice();
      
      let filteredJewelries = jewelries.map(jewelry => new JewelryEntity({
        id: jewelry.id,
        name: jewelry.name,
        weight: Number(jewelry.weight),
        imageUrls: jewelry.imageUrls,
        popularityScore: Number(jewelry.popularityScore)
      }, currentGoldPrice.price_gram_24k));

      // Apply price filter after price calculation (since price is calculated in domain)
      if (filterOptions?.priceRange) {
        const { min, max } = filterOptions.priceRange;
        filteredJewelries = filteredJewelries.filter(jewelry => {
          if (min !== undefined && max !== undefined) {
            return jewelry.price >= min && jewelry.price <= max;
          } else if (min !== undefined) {
            return jewelry.price >= min;
          } else if (max !== undefined) {
            return jewelry.price <= max;
          }
          return true;
        });
      }

      return filteredJewelries;
    } catch (error) {
      console.error('Error fetching all jewelry:', error);
      throw new Error('Failed to fetch jewelry');
    }
  }

  async getJewelryById(id: number): Promise<Jewelry | null> {
    try {
      const jewelry = await prisma.jewelry.findUnique({
        where: { id }
      });

      if (!jewelry) {
        return null;
      }

      const currentGoldPrice = await GoldApiManager.getInstance().getGoldPrice();

      return new JewelryEntity({
        id: jewelry.id,
        name: jewelry.name,
        weight: Number(jewelry.weight),
        imageUrls: jewelry.imageUrls,
        popularityScore: Number(jewelry.popularityScore)
      }, currentGoldPrice.price);
    } catch (error) {
      console.error('Error fetching jewelry by id:', error);
      throw new Error('Failed to fetch jewelry');
    }
  }

  async createJewelry(jewelryData: {
    name: string;
    weight: number;
    imageUrls: string[];
    popularityScore: number;
  }): Promise<Jewelry> {
    try {
      const jewelry = await prisma.jewelry.create({
        data: {
          name: jewelryData.name,
          weight: jewelryData.weight,
          imageUrls: jewelryData.imageUrls,
          popularityScore: jewelryData.popularityScore
        }
      });

      const currentGoldPrice = await GoldApiManager.getInstance().getGoldPrice();

      return new JewelryEntity({
        id: jewelry.id,
        name: jewelry.name,
        weight: Number(jewelry.weight),
        imageUrls: jewelry.imageUrls,
        popularityScore: Number(jewelry.popularityScore)
      }, currentGoldPrice.price);
    } catch (error) {
      console.error('Error creating jewelry:', error);
      throw new Error('Failed to create jewelry');
    }
  }

  async updateJewelry(id: number, jewelry: Partial<Omit<Jewelry, 'id' | 'price'>>): Promise<Jewelry | null> {
    try {
      const updatedJewelry = await prisma.jewelry.update({
        where: { id },
        data: {
          ...(jewelry.name && { name: jewelry.name }),
          ...(jewelry.weight !== undefined && { weight: jewelry.weight }),
          ...(jewelry.imageUrls && { imageUrls: jewelry.imageUrls }),
          ...(jewelry.popularityScore !== undefined && { popularityScore: jewelry.popularityScore })
        }
      });

      const currentGoldPrice = await GoldApiManager.getInstance().getGoldPrice();

      return new JewelryEntity({
        id: updatedJewelry.id,
        name: updatedJewelry.name,
        weight: Number(updatedJewelry.weight),
        imageUrls: updatedJewelry.imageUrls,
        popularityScore: Number(updatedJewelry.popularityScore)
      }, currentGoldPrice.price);
    } catch (error) {
      console.error('Error updating jewelry:', error);
      return null;
    }
  }

  async deleteJewelry(id: number): Promise<boolean> {
    try {
      await prisma.jewelry.delete({
        where: { id }
      });
      return true;
    } catch (error) {
      console.error('Error deleting jewelry:', error);
      return false;
    }
  }
}
