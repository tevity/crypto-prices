import { Module } from "@nestjs/common";
import { PricesController } from "./prices.controller";
import { PricesProvider } from './prices-provider.interface';
import { CoinApiPricesProvider } from "./coin-api/coin-api-prices-provider.service";
import { PricesService } from "./prices.service";

@Module({
    controllers: [PricesController],
    providers: [
        {
            provide: PricesProvider,
            useClass: CoinApiPricesProvider
        },
        PricesService
    ]
})
export class PricesModule {
}