import { CryptoPrice } from "./crypto-price.model";

// This should be an interface, but it's not possible to use interfaces as tokens for DI
export abstract class PricesProvider {
    public abstract getPrices(): CryptoPrice[];
}