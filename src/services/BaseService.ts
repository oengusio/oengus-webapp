import { environment } from '../environments/environment';
import {NwbAlertConfig, NwbAlertService, NwbAlertComponent} from '@oengus/ng-wizi-bulma';

export class BaseService {
  constructor(private toastr: NwbAlertService, private base = '') {}

  private stripLastSlash(path: string): string {
    if (path.endsWith('/')) {
      return path.substring(0, path.length - 1);
    }

    return path;
  }

  // TODO: replace all instances of this with v1url
  protected url(path: string, version = 'v1'): string {
    const parsedPath = this.stripLastSlash(path);
    const fullPath = this.base ?
      `${environment.api}/${version}/${this.base}/` :
      `${environment.api}/${version}/`;

    return this.stripLastSlash(`${fullPath}${parsedPath}`);
  }

  protected v2Url(path = ''): string {
    return this.url(path, 'v2');
  }

  protected v1Url(path = ''): string {
    return this.url(path, 'v1');
  }

  protected toast(message: string, duration = 3000, color = 'success'): NwbAlertComponent {
    const alertConfig: NwbAlertConfig = {
      message,
      duration,
      position: 'is-right',
      color: `is-${color}`
    };

    return this.toastr.open(alertConfig);
  }
}
