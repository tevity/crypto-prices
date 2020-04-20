import { PricesService } from "./prices.service";
import { PricesProvider } from "./prices-provider.interface";

describe('PricesService', () => {
    function createTarget({
        pricesProvider = {}
    } = {}) {
        return new PricesService(pricesProvider as PricesProvider);
    }

    describe('listPrices', () => {
        it('should return result from injected PricesProvider', () => {
            const prices = [{}, {}];
            const pricesProvider = {
                getPrices() { return prices; }
            };
            const target = createTarget({ pricesProvider });

            const result = target.listPrices();

            expect(result).toBe(prices);
        });
    });
});