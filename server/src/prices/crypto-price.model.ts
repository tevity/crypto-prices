export interface CryptoPrice {
    name: string;
    // This could be changed to be an object, with price and currency
    price: number;
    date: Date;
}