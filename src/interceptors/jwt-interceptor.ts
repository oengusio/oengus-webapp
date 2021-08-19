import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
