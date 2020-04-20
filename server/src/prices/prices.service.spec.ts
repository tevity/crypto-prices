import { PricesService } from "./prices.service";

describe('PricesService', () => {
    function createTarget() {
        return new PricesService();
    }

    describe('listPrices', () => {
        it('should return empty array', () => {
            const target = createTarget();

            const result = target.listPrices();

            expect(result).toEqual([]);
        });
    });
});