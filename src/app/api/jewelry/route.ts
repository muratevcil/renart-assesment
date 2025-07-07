// src/app/api/jewelry/route.ts
import { NextResponse } from 'next/server';
import { JewelryManager } from '../../../lib/infrastructure/postgresql/adapters/jewelryManager';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jewelryService = JewelryManager.getInstance();
    
    // Parse filter options from query parameters
    const filterOptions: any = {};
    
    // Parse price filter
    const priceFilter = searchParams.get('price');
    if (priceFilter) {
      const parts = priceFilter.split('-');
      const min = Number(parts[0]);
      const max = parts[1] === '+' ? undefined : Number(parts[1]);
      
      filterOptions.priceRange = {
        min: min,
        max: max
      };
    }

    // Parse popularity filter
    const popularityFilter = searchParams.get('popularity');
    if (popularityFilter) {
      const [min, max] = popularityFilter.split('-').map(Number);
      filterOptions.popularityScoreRange = {
        min: min,
        max: max
      };
    }

    const jewelries = await jewelryService.getAllJewelry(filterOptions);
    return NextResponse.json(jewelries);
  } catch (error) {
    console.error('Error in GET /api/jewelry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const jewelryService = JewelryManager.getInstance();
    const newJewelry = await jewelryService.createJewelry(body);
    return NextResponse.json(newJewelry, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/jewelry:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
