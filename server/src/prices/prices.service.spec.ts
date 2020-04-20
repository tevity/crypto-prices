import { PricesService } from "./prices.service";
import { PricesProvider } from "./prices-provider.interface";

describe('PricesService', () => {
    function createTarget({
        pricesProvider = {}
    } = {}) {
        return new PricesService(pricesProvider as PricesProvider);
    }

    describe('getLatestPrices', () => {
        it('should return result from injected PricesProvider', () => {
            const prices = [{}, {}];
            const pricesProvider = {
                getPrices() { return prices; }
            };
            const target = createTarget({ pricesProvider });

            const result = target.getLatestPrices();

            expect(result).toBe(prices);
        });
    });
});