import { Injectable } from "@nestjs/common";
import { CryptoPrice } from './crypto-price.model';
import { PricesProvider } from "./prices-provider.interface";

@Injectable()
export class PricesService {
    constructor(private pricesProvider: PricesProvider) { }

    listPrices(): CryptoPrice[] {
        return this.pricesProvider.getPrices();
    }
}