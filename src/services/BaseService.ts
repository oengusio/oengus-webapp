import { environment } from '../environments/environment';
import {NwbAlertConfig, NwbAlertService, NwbAlertComponent} from '@wizishop/ng-wizi-bulma';

export class BaseService {
  constructor(private toastr: NwbAlertService, private base: String = '') {}

  protected url(path: string): string {
    let parsedPath = path;

    if (parsedPath.startsWith('/')) {
      parsedPath = parsedPath.substr(1, parsedPath.length);
    }

    let fullPath = `${environment.api}/${this.base}/`;

    if (fullPath.endsWith('/') && !this.base) {
      fullPath = fullPath.substr(0, fullPath.length - 1);
    }

    return `${fullPath}${parsedPath}`;
  }

  protected toast(message: string, duration: number = 3000, color: string = 'success'): NwbAlertComponent {
    const alertConfig: NwbAlertConfig = {
      message,
      duration,
      position: 'is-right',
      color: `is-${color}`
    };

    return this.toastr.open(alertConfig);
  }
}
