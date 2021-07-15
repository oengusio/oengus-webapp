import {Injectable} from '@angular/core';
import {BaseService} from './BaseService';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {NwbAlertService} from '@wizishop/ng-wizi-bulma';

@Injectable({
  providedIn: 'root'
})
export default class CountyService extends BaseService {
  constructor(private http: HttpClient,
              toastr: NwbAlertService) {
    super(toastr, 'countries');
  }

  getCountries(): Observable<string[]> {
    return this.http.get<string[]>(this.url(''));
  }
}
