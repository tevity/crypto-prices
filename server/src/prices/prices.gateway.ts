import { WebSocketGateway, SubscribeMessage } from '@nestjs/websockets';
import { PricesService } from "./prices.service";
import { Observable } from "rxjs";
import { CryptoPrice } from "./crypto-price.model";
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class PricesGateway {
    constructor(private pricesService: PricesService) { }

    @SubscribeMessage('prices')
    getPrices(): Observable<{ event: 'prices', data: CryptoPrice[] }> {
        return this.pricesService.watchPrices().pipe(
            map(prices => ({
                event: 'prices',
                data: prices
            }))
        );
    }
}