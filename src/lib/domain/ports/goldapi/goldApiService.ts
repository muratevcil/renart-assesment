import { GoldApiResponse } from "../../entities/goldApiResponse";

export interface GoldApiServicePort {
    getGoldPrice(): Promise<GoldApiResponse>;
}