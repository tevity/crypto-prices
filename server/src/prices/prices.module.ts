import { Module, HttpModule } from "@nestjs/common";
import { PricesController } from "./prices.controller";
import { PricesProvider } from './prices-provider.interface';
import { CryptoApisPricesProvider } from "./crypto-apis/crypto-apis-prices-provider.service";
import { PricesService } from "./prices.service";
import { CryptoApisMapper } from "./crypto-apis/crypto-apis-mapper.service";

@Module({
    imports: [HttpModule],
    controllers: [PricesController],
    providers: [
        {
            provide: PricesProvider,
            useClass: CryptoApisPricesProvider
        },
        CryptoApisMapper,
        PricesService
    ]
})
export class PricesModule {
}