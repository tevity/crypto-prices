import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { CryptoPrice } from './crypto-price.model';
import { PricesProvider } from "./prices-provider.interface";

@Injectable()
export class PricesService {
    constructor(private pricesProvider: PricesProvider) { }

    getLatestPrices(): Observable<CryptoPrice[]> {
        return this.pricesProvider.getPrices();
    }
}