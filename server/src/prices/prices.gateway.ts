import { WebSocketGateway, SubscribeMessage, WsResponse } from '@nestjs/websockets';
import { PricesService } from "./prices.service";
import { Observable } from "rxjs";
import { CryptoPrice } from "./crypto-price.model";
import { map } from 'rxjs/operators';

@WebSocketGateway()
export class PricesGateway {
    constructor(private pricesService: PricesService) { }

    @SubscribeMessage('prices')
    streamPrices(): Observable<WsResponse<CryptoPrice[]>> {
        return this.pricesService.watchPrices().pipe(
            map(prices => ({
                event: 'prices',
                data: prices
            }))
        );
    }
}