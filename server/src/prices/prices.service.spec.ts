import { of, from } from "rxjs";
import { PricesService } from "./prices.service";
import { PricesProvider } from "./prices-provider.interface";

describe('PricesService', () => {
    function createTarget({
        pricesProvider = {},
        config = {
            pollingMilliseconds: from([])
        }
    } = {}) {
        return new PricesService(pricesProvider as PricesProvider, config);
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

    describe('watchPrices', () => {
        it('should go to the provider immediately when subscribed to', () => {
            jest.useFakeTimers();

            const pricesProvider = {
                getPrices: jasmine.createSpy('pricesProvider.getPrices').and.returnValue(of([]))
            };
            const config = {
                pollingMilliseconds: of(10)
            };
            const target = createTarget({ pricesProvider, config });

            const subscriber = target.watchPrices().subscribe();
            jest.advanceTimersByTime(1);
            subscriber.unsubscribe();

            expect(pricesProvider.getPrices).toHaveBeenCalled();
        });

        it('should go to the provider after every interval defined by the config', () => {
            jest.useFakeTimers();

            const pricesProvider = {
                getPrices: jasmine.createSpy('pricesProvider.getPrices').and.returnValue(of([]))
            };
            const config = {
                pollingMilliseconds: of(10)
            };
            const target = createTarget({ pricesProvider, config });

            const subscriber = target.watchPrices().subscribe();
            jest.advanceTimersByTime(30);
            subscriber.unsubscribe();

            // Should be called at: 0, 10, 20 and 30ms
            expect(pricesProvider.getPrices).toHaveBeenCalledTimes(4);
        });

        describe('when there are multiple subscribers', () => {
            it('should only go to the provider once', () => {
                jest.useFakeTimers();

                const pricesProvider = {
                    getPrices: jasmine.createSpy('pricesProvider.getPrices').and.returnValue(of([]))
                };
                const config = {
                    pollingMilliseconds: of(10)
                };
                const target = createTarget({ pricesProvider, config });

                const firstSubscriber = target.watchPrices().subscribe();
                // Run for the first subscriber a couple of times, so we've polled at 0 and 10ms
                jest.advanceTimersByTime(10);
                const secondSubscriber = target.watchPrices().subscribe();
                // Run for both the subscribers a couple of times, so we've now polled at 20 and 30ms
                jest.advanceTimersByTime(20);

                firstSubscriber.unsubscribe();
                secondSubscriber.unsubscribe();

                expect(pricesProvider.getPrices).toHaveBeenCalledTimes(4);
            });

            it('should stop polling after all subscribers have disconnected', () => {
                jest.useFakeTimers();

                const pricesProvider = {
                    getPrices: jasmine.createSpy('pricesProvider.getPrices').and.returnValue(of([]))
                };
                const config = {
                    pollingMilliseconds: of(10)
                };
                const target = createTarget({ pricesProvider, config });

                const firstSubscriber = target.watchPrices().subscribe();
                const secondSubscriber = target.watchPrices().subscribe();
                // Run for the first subscriber a couple of times, so we've polled at 0 and 10ms
                jest.advanceTimersByTime(11);

                firstSubscriber.unsubscribe();
                secondSubscriber.unsubscribe();
                pricesProvider.getPrices.calls.reset();

                // If we were still polling, we would see another request in this timeframe
                jest.advanceTimersByTime(10);
                expect(pricesProvider.getPrices).not.toHaveBeenCalled();
            });
        })
    });
});