import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class EnvironmentService {
    get apiUrl() { return environment.apiUrl; }
    get webSocketUrl() { return environment.webSocketUrl; }
}
