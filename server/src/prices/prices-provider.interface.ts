import { CryptoPrice } from "./crypto-price.model";

export interface PricesProvider {
    getPrices(): CryptoPrice[];
}