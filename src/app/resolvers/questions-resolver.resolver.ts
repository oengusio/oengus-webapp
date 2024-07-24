import { ResolveFn } from '@angular/router';
import { Question } from '../../model/question';
import { inject } from '@angular/core';
import { MarathonService } from '../../services/marathon.service';
import { map } from 'rxjs/operators';

export const questionsResolverResolver: ResolveFn<Question[]> = (route, state) => {
  const marathonService = inject(MarathonService);

  return marathonService.loadQuestions(route.parent.paramMap.get('id'))
    .pipe(map(x => x.data));
};
