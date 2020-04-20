import { PricesProvider } from "../prices-provider.interface";
import { CryptoPrice } from "../crypto-price.model";

export class CoinApiPricesProvider extends PricesProvider {
    getPrices(): CryptoPrice[] {
        return [
            { name: 'first', price: 1, date: new Date() },
            { name: 'second', price: 3.14, date: new Date() },
            { name: 'third', price: 100.5, date: new Date() },
        ]
    }

}