import { Module, HttpModule } from "@nestjs/common";
import { PricesConfig } from "./prices.config";
import { PricesController } from "./prices.controller";
import { PricesGateway } from "./prices.gateway";
import { PricesService } from "./prices.service";
import { PricesProvider } from './prices-provider.interface';
import { CryptoApisPricesProvider } from "./crypto-apis/crypto-apis-prices-provider.service";
import { CryptoApisMapper } from "./crypto-apis/crypto-apis-mapper.service";

@Module({
    imports: [HttpModule],
    controllers: [PricesController],
    providers: [
        PricesConfig,
        PricesGateway,
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