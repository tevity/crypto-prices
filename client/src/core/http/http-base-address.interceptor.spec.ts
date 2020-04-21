import { HttpBaseAddressInterceptor } from './http-base-address.interceptor';
import { HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { EnvironmentService } from '../environment.service';

describe('HttpBaseAddressInterceptor', () => {
    function createTarget({
        environment = {}
    } = {}) {
        return new HttpBaseAddressInterceptor(environment as EnvironmentService);
    }

    describe('apiUrl does not end with slash', () => {
        describe('request url does not start with slash', () => {
            it('should add the two parts together with a slash in-between', () => {
                const environment = {
                    apiUrl: 'http://localhost:3000'
                };
                const target = createTarget({ environment });

                const request = new HttpRequest('GET', 'relative-url');
                const next = {
                    handle: jasmine.createSpy('next.handle').and.returnValue(of({}))
                };
                target.intercept(request, next).subscribe();

                expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({ url: 'http://localhost:3000/relative-url' }));
            });
        });

        describe('request url starts with slash', () => {
            it('should add the two parts together with a single slash in-between', () => {
                const environment = {
                    apiUrl: 'http://localhost:3000'
                };
                const target = createTarget({ environment });

                const request = new HttpRequest('GET', '/relative-url');
                const next = {
                    handle: jasmine.createSpy('next.handle').and.returnValue(of({}))
                };
                target.intercept(request, next).subscribe();

                expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({ url: 'http://localhost:3000/relative-url' }));
            });
        });
    });

    describe('apiUrl ends with a slash', () => {
        describe('request url does not start with slash', () => {
            it('should add the two parts together with a single slash in-between', () => {
                const environment = {
                    apiUrl: 'http://localhost:3000/'
                };
                const target = createTarget({ environment });

                const request = new HttpRequest('GET', 'relative-url');
                const next = {
                    handle: jasmine.createSpy('next.handle').and.returnValue(of({}))
                };
                target.intercept(request, next).subscribe();

                expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({ url: 'http://localhost:3000/relative-url' }));
            });
        });

        describe('request url starts with slash', () => {
            it('should add the two parts together with a single slash in-between', () => {
                const environment = {
                    apiUrl: 'http://localhost:3000/'
                };
                const target = createTarget({ environment });

                const request = new HttpRequest('GET', '/relative-url');
                const next = {
                    handle: jasmine.createSpy('next.handle').and.returnValue(of({}))
                };
                target.intercept(request, next).subscribe();

                expect(next.handle).toHaveBeenCalledWith(jasmine.objectContaining({ url: 'http://localhost:3000/relative-url' }));
            });
        });
    });
});
