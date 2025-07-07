export interface GoldApiResponse {
    timestamp: string;
    price_gram_14k: number;
    price_gram_18k: number;
    price_gram_20k: number;
    price_gram_22k: number;
    price_gram_24k: number;
    price:number;
}

export class GoldApiResponseEntity implements GoldApiResponse {
    
    private _timestamp: string;
    private _price_gram_14k: number;
    private _price_gram_18k: number;
    private _price_gram_20k: number;
    private _price_gram_22k: number;
    private _price_gram_24k: number;
    private _price: number;

    constructor(data: GoldApiResponse) {
        this._timestamp = data.timestamp;
        this._price_gram_14k = data.price_gram_14k;
        this._price_gram_18k = data.price_gram_18k;
        this._price_gram_20k = data.price_gram_20k;
        this._price_gram_22k = data.price_gram_22k;
        this._price_gram_24k = data.price_gram_24k;
        this._price = data.price;
    }

    // Getters
    get timestamp(): string {
        return this._timestamp;
    }

    get price_gram_14k(): number {
        return this._price_gram_14k;
    }

    get price_gram_18k(): number {
        return this._price_gram_18k;
    }

    get price_gram_20k(): number {
        return this._price_gram_20k;
    }

    get price_gram_22k(): number {
        return this._price_gram_22k;
    }

    get price_gram_24k(): number {
        return this._price_gram_24k;
    }

    get price(): number {
        return this._price;
    }

    // Setters
    set timestamp(value: string) {
        this._timestamp = value;
    }

    set price_gram_14k(value: number) {
        this._price_gram_14k = value;
    }

    set price_gram_18k(value: number) {
        this._price_gram_18k = value;
    }

    set price_gram_20k(value: number) {
        this._price_gram_20k = value;
    }

    set price_gram_22k(value: number) {
        this._price_gram_22k = value;
    }

    set price_gram_24k(value: number) {
        this._price_gram_24k = value;
    }

    set price(value: number) {
        this._price = value;
    }
}