import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { WebSocketService } from '@core';
import { CryptoPrice } from './crypto-price.model';

@Injectable({ providedIn: 'root' })
export class PricesService {
    constructor(
        private http: HttpClient,
        private webSocket: WebSocketService) { }

    getLatestPrices(): Observable<CryptoPrice[]> {
        return this.http.get<CryptoPrice[]>('prices').pipe(
            map(prices => this.mapDate(prices))
        );
    }

    streamPrices(): Observable<CryptoPrice[]> {
        return this.webSocket.listen<CryptoPrice[]>('prices').pipe(
            map(prices => this.mapDate(prices))
        );
    }

    // Converts string date into JS date
    private mapDate(prices: CryptoPrice[]): CryptoPrice[] {
        return prices.map(price => ({ ...price, ...{ date: new Date(price.date) } }));
    }
}
