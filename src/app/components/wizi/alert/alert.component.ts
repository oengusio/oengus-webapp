import { Observable, Subject } from 'rxjs';
import { NwbAlertConfig } from './alert.service';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nwb-alert',
  templateUrl: './alert.component.html',
  host: {
    class: 'nwb-alert',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
})
export class NwbAlertComponent implements OnInit {
  public config: NwbAlertConfig = {
    message: 'NOT CONFIGURED',
  };

  /** Subject for notifying the user that the dialog has finished closing. */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _afterClosed = new Subject<any>();

  open = false;

  // private timer: NodeJS.Timeout | undefined;

  ngOnInit() {
    setTimeout(() => {
      this.open = true;
    }, 50);

    if (this.config.duration ?? 0 > 0) {
      /*this.timer = */setTimeout(() => this.dismiss(), this.config.duration);
    }
  }

  dismiss() {
    this.open = false;

    setTimeout(() => {
      this._afterClosed.next(true);
      this._afterClosed.complete();
    }, 200);
  }

  /**
   * Gets an observable that is notified when the dialog is finished closing.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  afterClosed(): Observable<any> {
    return this._afterClosed.asObservable();
  }
}
