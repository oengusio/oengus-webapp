import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private userService = inject(UserService);


  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const updateHeaders = {
      headers: req.headers.set('oengus-version', '1'),
    };

    const token = this.userService.token;

    if (token) {
      updateHeaders.headers = updateHeaders.headers.set('Authorization', 'Bearer ' + token);
    }

    return next.handle(req.clone(updateHeaders));
  }
}
