import { GoldApiManager } from "@/lib/infrastructure/goldapi/goldApiAdapter";
import { NextResponse } from "next/server";

export async function GET() {
    const goldPrice = await GoldApiManager.getInstance().getGoldPrice();
    return NextResponse.json(goldPrice);
}