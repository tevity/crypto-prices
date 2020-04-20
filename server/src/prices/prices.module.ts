import { Module, HttpModule } from "@nestjs/common";
import { PricesController } from "./prices.controller";
import { PricesProvider } from './prices-provider.interface';
import { CryptoApisPricesProvider } from "./crypto-apis/crypto-apis-prices-provider.service";
import { PricesService } from "./prices.service";
import { CryptoApisMapper } from "./crypto-apis/crypto-apis-mapper.service";
import { PricesConfig } from "./prices.config";

@Module({
    imports: [HttpModule],
    controllers: [PricesController],
    providers: [
        PricesConfig,
        PricesService,
        {
            provide: PricesProvider,
            useClass: CryptoApisPricesProvider
        },
        CryptoApisMapper
    ]
})
export class PricesModule {
}