import { Controller, Get } from "@nestjs/common";
import { Observable } from "rxjs";
import { CryptoPrice } from "./crypto-price.model";
import { PricesService } from "./prices.service";

@Controller('prices')
export class PricesController {
    constructor(private pricesService: PricesService) { }

    @Get()
    listAll(): Observable<CryptoPrice[]> {
        return this.pricesService.getLatestPrices();
    }
}