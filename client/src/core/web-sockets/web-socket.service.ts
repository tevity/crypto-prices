import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as socketio from 'socket.io-client';
import { EnvironmentService } from '../environment.service';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private socket: SocketIOClient.Socket;

    constructor(private environment: EnvironmentService) { }

    connect() {
        if (!this.socket) {
            this.socket = socketio(this.environment.webSocketUrl);
        }

        if (this.socket.disconnected) {
            this.socket.connect();
        }
    }

    listen<TEvent>(eventName: string): Observable<TEvent> {
        this.connect();

        const observable$ = new Observable<TEvent>(observer => {
            this.socket.on(eventName, (data: TEvent) => observer.next(data));
        }).pipe(
            finalize(() => this.socket.off(eventName))
        );

        // Trigger the server event stream
        this.socket.emit(eventName);

        return observable$;
    }
}
