import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { SelectionService } from '../../services/selection.service';
import { Selection } from '../../model/selection';

@Injectable()
export class SelectionResolver  {
  private selectionService = inject(SelectionService);


  resolve(route: ActivatedRouteSnapshot):
    Observable<Map<number, Selection>> | Promise<Map<number, Selection>> | Map<number, Selection> {
    if (route.data['isAdminRoute']) {
      return firstValueFrom(this.selectionService.getAllForMarathonAdmin(route.parent.paramMap.get('id'), route.data['statuses']))
        .catch(() => new Map());
    }

    return firstValueFrom(
      this.selectionService.getAllForMarathon(route.parent.paramMap.get('id'), route.data['statuses'])
    ).catch(() => new Map());
  }
}
