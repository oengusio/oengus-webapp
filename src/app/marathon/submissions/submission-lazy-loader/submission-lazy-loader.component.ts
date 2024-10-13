import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Submission } from '../../../../model/submission';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { MarathonService } from '../../../../services/marathon.service';
import { SubmissionPage } from '../../../../model/submission-page';

@Component({
  selector: 'app-submission-lazy-loader',
  templateUrl: './submission-lazy-loader.component.html',
  styleUrl: './submission-lazy-loader.component.scss'
})
export class SubmissionLazyLoaderComponent implements OnInit, OnDestroy {
  @ViewChild('lazyLoadTrigger') lazyLoadTrigger: ElementRef<HTMLDivElement>;

  public submissions$ = new BehaviorSubject<Submission[]>([]);
  public canLoadMore = true;
  private waitingOnNextPage = false;

  @Input() public nextSubmissionPage: Subject<SubmissionPage>;
  @Input() public selection: Map<number, Selection>;
  @Input() public showDelete: boolean;
  @Input() public userIsAdmin: boolean;

  @Output() private loadNextPage = new EventEmitter<number>();
  @Output() public deleteSubmission = new EventEmitter<number>();
  @Output() public deleteGame = new EventEmitter<number>();
  @Output() public deleteCategory = new EventEmitter<{ gameId: number; categoryId: number }>();

  private lastPageLoaded = 0;

  private observer = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting && !this.waitingOnNextPage) {
      this.loadNextPage.emit(++this.lastPageLoaded);
      this.waitingOnNextPage = true;
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  constructor(
    public marathonService: MarathonService,
  ) {
  }


  ngOnInit(): void {
    console.log(this.lazyLoadTrigger);

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
      // this.search('');
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
