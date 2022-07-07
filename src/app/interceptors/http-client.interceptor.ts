import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants } from '../shared/constants';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  readonly windowData = constants.windowData;
  token = this.windowData ? this.windowData.ng_tags.OktaAccessToken : '';

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token.length) {
      let headers = request.headers;
      headers = headers.set('Cache-Control', 'no-cache');
      headers = headers.set('Authorization', `Bearer ${this.token}`);
      const authReq = request.clone({
        headers
      });
      return next.handle(authReq);
    }
    return next.handle(request);
  }
}
