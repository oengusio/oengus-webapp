import { environment } from '../environments/environment';
import {NwbAlertConfig, NwbAlertService, NwbAlertComponent} from '@wizishop/ng-wizi-bulma';

export class BaseService {
  constructor(private toastr: NwbAlertService, private base: String = '') {}

  protected url(path: string, version = 'v1'): string {
    let parsedPath = path;

    if (parsedPath.startsWith('/')) {
      parsedPath = parsedPath.substring(1, parsedPath.length);
    }

    const fullPath = this.base ?
      `${environment.api}/${version}/${this.base}/` :
      `${environment.api}/${version}/`;

    return `${fullPath}${parsedPath}`;
  }

  protected v2Url(path: string): string {
    return this.url(path, 'v2');
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
