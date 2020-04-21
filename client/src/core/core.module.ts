import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpBaseAddressInterceptor } from './http';

@NgModule()
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpBaseAddressInterceptor, multi: true }
]