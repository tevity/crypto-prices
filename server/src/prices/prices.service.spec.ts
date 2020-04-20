import { PricesService } from "./prices.service";
import { PricesProvider } from "./prices-provider.interface";
import { of } from "rxjs";

describe('PricesService', () => {
    function createTarget({
        pricesProvider = {}
    } = {}) {
        return new PricesService(pricesProvider as PricesProvider);
    }

    describe('getLatestPrices', () => {
        it('should return result from injected PricesProvider', done => {
            const prices = [{}, {}];
            const pricesProvider = {
                getPrices() { return of(prices); }
            };
            const target = createTarget({ pricesProvider });

            target.getLatestPrices().subscribe(result => {
                expect(result).toBe(prices);
                done();
            });
        });
    });
});