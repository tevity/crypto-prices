import { Injectable } from "@nestjs/common";
import { Observable, timer } from "rxjs";
import { switchMap, shareReplay } from "rxjs/operators";
import { CryptoPrice } from './crypto-price.model';
import { PricesProvider } from "./prices-provider.interface";
import { PricesConfig } from "./prices.config";

@Injectable()
// All of the methods in here currently just return a CryptoPrice object, but this could (should)
// be mapped to a DTO/ViewModel that would be passed back to the client
export class PricesService {
    constructor(private pricesProvider: PricesProvider, private config: PricesConfig) { }

    getLatestPrices(): Observable<CryptoPrice[]> {
        return this.pricesProvider.getPrices();
    }

    watchPrices(): Observable<CryptoPrice[]> {
        return this.pricesPoller;
    }

    private pricesPoller = this.config.pollingMilliseconds.pipe(
        switchMap(pollingMilliseconds => timer(0, pollingMilliseconds)),
        // Really, this would have some error handling and back-off logic, in case there is a problem with the provider
        switchMap(() => this.getLatestPrices()),
        // Share this observable and replay it, so we don't hit the provider for each of our own subscribers
        shareReplay({ refCount: true })
    );
}