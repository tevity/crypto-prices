import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnvironmentService } from '../environment.service';

@Injectable({ providedIn: 'root' })
export class HttpBaseAddressInterceptor implements HttpInterceptor {
    constructor(private environment: EnvironmentService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const baseUrl = this.environment.apiUrl.endsWith('/') ? this.environment.apiUrl : `${this.environment.apiUrl}/`;
        const relativeUrl = req.url.startsWith('/') ? req.url.substr(1) : req.url;
        const updatedUrl = `${baseUrl}${relativeUrl}`;
        const updatedRequest = req.clone({ url: updatedUrl });
        return next.handle(updatedRequest);
    }
}