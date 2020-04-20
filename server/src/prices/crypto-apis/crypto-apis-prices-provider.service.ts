import { HttpService, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PricesProvider } from "../prices-provider.interface";
import { CryptoPrice } from "../crypto-price.model";
import { apiKey } from "./crypto-apis.config";
import { CryptoApisGetAssetsResponse } from "./crypto-apis-get-assets-response.model";
import { CryptoApisMapper } from "./crypto-apis-mapper.service";



@Injectable()
export class CryptoApisPricesProvider extends PricesProvider {
    constructor(private http: HttpService, private mapper: CryptoApisMapper) { super(); }

    getPrices(): Observable<CryptoPrice[]> {
        return this.http.get<CryptoApisGetAssetsResponse>('https://api.cryptoapis.io/v1/assets', {
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': apiKey
            }
        }).pipe(
            map((response) => {
                const prices = response.data.payload;
                return prices.map(price => this.mapper.mapCryptoPrice(price))
            })
        );
    }
}