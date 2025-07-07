import { GoldApiServicePort } from "../../domain/ports/goldapi/goldApiService";
import { GoldApiResponse } from "../../domain/entities/goldApiResponse";

export class GoldApiManager implements GoldApiServicePort {
    private static instance: GoldApiManager;

    private static goldApiResponseEntity: GoldApiResponse;

    private constructor() {
        this.initializeGoldApiResponse();
    }

    private async initializeGoldApiResponse(): Promise<void> {
        try {
            const response = await fetch(`${process.env.GOLD_API_BASE_URL}/XAU/USD`, {
                headers: {
                    'x-access-token': process.env.GOLD_API_ACCESS_TOKEN!
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch gold price: ${response.status}`);
            }
            
            const data = await response.json();
            GoldApiManager.goldApiResponseEntity = data as GoldApiResponse;
        } catch (error) {
            console.error('Error initializing GoldApiResponse:', error);
            throw new Error('Failed to initialize GoldApiResponse');
        }
    }

    public static getInstance(): GoldApiManager {
        if (!GoldApiManager.instance) {
            GoldApiManager.instance = new GoldApiManager();
        }
        return GoldApiManager.instance;
    }

    async getGoldPrice(): Promise<GoldApiResponse> {
        // Check if we have cached data and if it's from the last 2 hours
        if (GoldApiManager.goldApiResponseEntity) {
            const dataTimestamp = new Date(GoldApiManager.goldApiResponseEntity.timestamp);
            if (Date.now() - dataTimestamp.getTime() > 2 * 60 * 60 * 1000) {
                // Return cached data if it's less than 2 hours old
                return GoldApiManager.goldApiResponseEntity;
            }
        }

        // If no cached data or data is older than 2 hours, fetch new data
        try {
            const response = await fetch(`${process.env.GOLD_API_BASE_URL}/XAU/USD`, {
                headers: {
                    'x-access-token': process.env.GOLD_API_ACCESS_TOKEN!
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to fetch gold price: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Validate the response data structure
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid response format from Gold API');
            }
            
            // Update the in-memory cache with new data
            GoldApiManager.goldApiResponseEntity = data as GoldApiResponse;
            
            // Log successful cache update for debugging
            console.log('Gold API cache updated successfully:', {
                timestamp: data.timestamp,
                price: data.price_gram_24k
            });
            
            return GoldApiManager.goldApiResponseEntity;
        } catch (error) {
            console.error('Error fetching gold price:', error);
            throw new Error('Failed to fetch gold price');
        }
    }
}