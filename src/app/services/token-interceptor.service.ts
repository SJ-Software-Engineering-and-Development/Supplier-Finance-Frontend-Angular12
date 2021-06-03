import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/index';
import { AuthenticationService } from './authentication.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public auth: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    });

    return next.handle(request);
  }
}