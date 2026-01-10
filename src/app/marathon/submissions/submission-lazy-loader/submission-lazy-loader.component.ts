import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AsyncPipe } from '@angular/common';
import { Submission } from '../../../../model/submission';
import { BehaviorSubject, Subject } from 'rxjs';
import { MarathonService } from '../../../../services/marathon.service';
import { SubmissionPage } from '../../../../model/submission-page';
import { UserLinkComponent } from '../../../elements/user-link/user-link.component';
import { OengusCommonModule } from '../../../oengus-common/oengus-common.module';
import { SubmissionGameComponent } from '../submission-game/submission-game.component';
import { LoadingIndicatorComponent } from '../../../elements/loading-indicator/loading-indicator.component';

@Component({
    selector: 'app-submission-lazy-loader',
    templateUrl: './submission-lazy-loader.component.html',
    styleUrl: './submission-lazy-loader.component.scss',
    imports: [
        CommonModule,
        AsyncPipe,
        TranslateModule,
        UserLinkComponent,
        OengusCommonModule,
        SubmissionGameComponent,
        LoadingIndicatorComponent,
    ]
})
export class SubmissionLazyLoaderComponent implements OnInit, OnDestroy {
  marathonService = inject(MarathonService);

  @ViewChild('lazyLoadTrigger') lazyLoadTrigger: ElementRef<HTMLDivElement>;

  public submissions$ = new BehaviorSubject<Submission[]>([]);
  public canLoadMore = true;
  private waitingOnNextPage = false;

  @Input() public nextSubmissionPage: Subject<SubmissionPage>;
  @Input() public selection: Map<number, Selection>;
  @Input() public showDelete: boolean;
  @Input() public userIsAdmin: boolean;
  @Input() private doInitialLoad = true;

  @Output() private loadNextPage = new EventEmitter<number>();
  @Output() private deleteSubmission = new EventEmitter<number>();
  @Output() private deleteGame = new EventEmitter<number>();
  @Output() private deleteCategory = new EventEmitter<number>();

  private lastPageLoaded = 0;

  private observer = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting && !this.waitingOnNextPage) {
      console.log('Triggering next page load...');
      this.triggerNextPageLoad();
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });


  ngOnInit(): void {
    // Prevents flickering when the component first appears
    this.canLoadMore = this.doInitialLoad;

    this.nextSubmissionPage.subscribe((nextPage) => {
      this.canLoadMore = !nextPage.empty && !nextPage.last;

      if (!nextPage.empty) {
        const content = nextPage.content.filter(
          (submission) => submission.games.filter(
            (game) => game.categories.length > 0
          ).length > 0
        );

        this.submissions$.next(this.submissions$.getValue().concat(...content));
      }

      this.waitingOnNextPage = false;
    });

    // set-up lazy loading
    window.requestAnimationFrame(() => {
      this.observer.observe(this.lazyLoadTrigger.nativeElement);
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  public resetLoadedSubmissions(): void {
    // Reset page counter
    this.lastPageLoaded = 0;

    // Prepare state to allow new loads
    this.waitingOnNextPage = false;
    this.canLoadMore = true;

    // Clear submissions to allow trigger to move into view
    this.submissions$.next([]);
  }

  private triggerNextPageLoad(): void {
    this.waitingOnNextPage = true;
    this.loadNextPage.emit(++this.lastPageLoaded);
  }

  deleteSubmissionFromList(id: number): void {
    this.deleteSubmission.emit(id);
    this.submissions$.next(this.submissions$.getValue().filter(submission => submission.id !== id));
  }

  deleteGameFromList(gameId: number, doApi = true): void {
    if (doApi) {
      this.deleteGame.emit(gameId);
    }

    this.submissions$.getValue().forEach((submission) => {
      submission.games = submission.games.filter(game => game.id !== gameId);
    });
  }

  deleteCategoryFromList(gameId: number, categoryId: number): void {
    this.submissions$.getValue().forEach((submission) => {
      const game = submission.games.find(g => g.id === gameId);

      if (game) {
        game.categories = game.categories.filter(c => c.id !== categoryId);

        if (game.categories.length === 0) {
          this.deleteGameFromList(gameId, false);
        }

        this.deleteCategory.emit(categoryId);
      }
    });
  }
}
