// src/app/api/jewelry/route.ts
import { NextResponse } from 'next/server';
import { JewelryManager } from '../../../lib/infrastructure/postgresql/adapters/jewelryAdapter';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const jewelryService = JewelryManager.getInstance();
    const jewelries = await jewelryService.getAllJewelry(searchParams);
    return NextResponse.json(jewelries);
}

export async function POST(request: Request) {
    const body = await request.json();
    const jewelryService = JewelryManager.getInstance();
    const newJewelry = await jewelryService.createJewelry(body);
    return NextResponse.json(newJewelry, { status: 201 });
}
