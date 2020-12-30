import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {
  public stateObserver: Observable<boolean>;
  private stateSubject = new Subject<boolean>();
  private loading = true;

  constructor() {
    this.stateObserver = this.stateSubject.asObservable();
  }

  setLoading(loading: boolean): void {
    this.loading = loading;
    this.stateSubject.next(loading);
  }
}
