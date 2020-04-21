import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CryptoPrice } from './crypto-price.model';

@Injectable({ providedIn: 'root' })
export class PricesService {
    constructor(private http: HttpClient) { }

    getLatestPrices(): Observable<CryptoPrice[]> {
        return this.http.get<CryptoPrice[]>('prices').pipe(
            // convert string date into JS date
            tap(prices => prices.forEach(price => price.date = new Date(price.date)))
        );
    }
}