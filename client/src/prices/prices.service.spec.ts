import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { WebSocketService } from '@core';
import { PricesService } from "./prices.service";

describe('PricesService', () => {
    function createTarget({
        http = {},
        webSocket = {}
    } = {}) {
        return new PricesService(http as HttpClient, webSocket as WebSocketService);
    }

    describe('getLatestPrices', () => {
        it('should get the prices from the prices endpoint', done => {
            const http = {
                get: jasmine.createSpy('http.get').and.returnValue(of([]))
            };
            const target = createTarget({ http });

            target.getLatestPrices().subscribe(() => {
                expect(http.get).toHaveBeenCalledWith('prices');
                done();
            });
        });

        it('should map the prices date string to a JS date', done => {
            const prices = [{ date: '2000-01-01T01:02:03.456Z' }];
            const http = {
                get() { return of(prices); }
            };
            const target = createTarget({ http });

            target.getLatestPrices().subscribe(result => {
                expect(result[0].date).toEqual(new Date(2000, 0, 1, 1, 2, 3, 456));
                done();
            });
        });
    });

    describe('streamPrices', () => {
        it('should listen for prices events from the websocket', done => {
            const webSocket = {
                listen: jasmine.createSpy('webSocket.listen').and.returnValue(of([]))
            };
            const target = createTarget({ webSocket });

            target.streamPrices().subscribe(() => {
                expect(webSocket.listen).toHaveBeenCalledWith('prices');
                done();
            });
        });

        it('should map the prices date string to a JS date', done => {
            const prices = [{ date: '2000-01-01T01:02:03.456Z' }];
            const webSocket = {
                listen() { return of(prices); }
            };
            const target = createTarget({ webSocket });

            target.streamPrices().subscribe(result => {
                expect(result[0].date).toEqual(new Date(2000, 0, 1, 1, 2, 3, 456));
                done();
            });
        });
    });
});