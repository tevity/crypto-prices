import { CryptoApisMapper } from "./crypto-apis-mapper.service";
import { CryptoApisCryptoPrice } from "./crypto-apis-crypto-price.model";

describe('CryptoApisMapper', () => {
    function createTarget() {
        return new CryptoApisMapper();
    }

    describe('mapCryptoPrice', () => {
        it('should map the external name to the name', () => {
            const target = createTarget();

            const externalPrice = {
                name: 'a'
            } as CryptoApisCryptoPrice;
            const result = target.mapCryptoPrice(externalPrice);

            expect(result.name).toBe('a');
        });

        it('should map the external price to the price', () => {
            const target = createTarget();

            const externalPrice = {
                price: 3.14
            } as CryptoApisCryptoPrice;
            const result = target.mapCryptoPrice(externalPrice);

            expect(result.price).toBe(3.14);
        });

        it('should map the external lastUpdate UNIX Epoch to the date', () => {
            const target = createTarget();

            const externalPrice = {
                lastUpdate: 946684800000
            } as CryptoApisCryptoPrice;
            const result = target.mapCryptoPrice(externalPrice);

            expect(result.date).toEqual(new Date(2000, 0, 1));
        });
    })
})