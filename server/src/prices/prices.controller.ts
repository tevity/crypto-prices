import { Controller, Get } from "@nestjs/common";
import { CryptoPrice } from "./crypto-price.model";
import { PricesService } from "./prices.service";

@Controller('prices')
export class PricesController {
    constructor(private pricesService: PricesService) { }

    @Get()
    listAll(): CryptoPrice[] {
        return this.pricesService.listPrices();
    }
}