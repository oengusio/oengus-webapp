import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { MarathonService } from '../../../services/marathon.service';
import { UserService } from '../../../services/user.service';
import { GameService } from '../../../services/game.service';
import { SubmissionService } from '../../../services/submission.service';
import { CategoryService } from '../../../services/category.service';
import { Question } from 'src/model/question';
import { Answer } from '../../../model/answer';
import { debounceTime, distinctUntilChanged, firstValueFrom, Subject } from 'rxjs';
import { SubmissionPage } from '../../../model/submission-page';
import { SubmissionLazyLoaderComponent } from './submission-lazy-loader/submission-lazy-loader.component';

interface SearchItem {
  term: string;
  status: string;
}

type AllowedTabs = 'submissions' | 'answers';

@Component({
    selector: 'app-submissions',
    templateUrl: './submissions.component.html',
    styleUrls: ['./submissions.component.scss'],
    standalone: false
})
export class SubmissionsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('searchLazyLoader') searchLazyLoader: SubmissionLazyLoaderComponent;

  public nextSubmissionPageLoaded = new Subject<SubmissionPage>();
  public nextSearchPageLoaded = new Subject<SubmissionPage>();

  public selection: Map<number, Selection>;
  public questions: Map<number, Question>;
  // username -> answers
  public answers: Map<string, Answer[]>;

  public gameFilter = '';
  public statusFilter = '';

  public active: AllowedTabs = 'submissions';

  public faTimes = faTimes;
  public faSearch = faSearch;

  private searchTerm = new Subject<SearchItem>();

  private handlerBound = this.ctrlFHandler.bind(this);
  private answerLoadAttempted = false;

  constructor(private route: ActivatedRoute,
              public marathonService: MarathonService,
              public userService: UserService,
              public gameService: GameService,
              private submissionService: SubmissionService,
              private categoryService: CategoryService) {
    this.selection = this.route.snapshot.data.selection;
    this.answers = new Map<string, Answer[]>();
    this.questions = new Map<number, Question>();

    // Order of operations, questions go before answers.
    this.marathonService.marathon.questions.forEach((question) => {
      if (question.fieldType === 'FREETEXT') {
        return;
      }

      this.questions.set(question.id, question);
    });
  }

  ngOnInit() {
    console.log('Registering ctrl+f handler');
    window.addEventListener('keydown', this.handlerBound);

    this.searchTerm.pipe(
      debounceTime(300),

      distinctUntilChanged((prev, curr) => prev.term === curr.term && prev.status === curr.status)
    ).subscribe(() => {
      console.log('is searching', this.isSearching);
      if (this.isSearching) {
        this.searchLazyLoader.resetLoadedSubmissions();
      }
    });
  }

  ngOnDestroy(): void {
    console.log('Submissions destroyed');
    window.removeEventListener('keydown', this.handlerBound);
  }

  async loadNextSubmissionPage(pageNum: number): Promise<void> {
    const nextPage = await firstValueFrom(this.submissionService.submissions(
      this.marathonService.marathon.id,
      pageNum
    ));

    this.nextSubmissionPageLoaded.next(nextPage);
  }

  async loadNextSearchPage(pageNum: number): Promise<void> {
    const nextPage = await firstValueFrom(this.submissionService.searchSubmissions(
      this.marathonService.marathon.id,
      this.gameFilter,
      this.statusFilter ? this.statusFilter : null,
      pageNum
    ));

    this.nextSearchPageLoaded.next(nextPage);
  }

  ctrlFHandler(event: KeyboardEvent): boolean {
    if (event.ctrlKey && event.key === 'f' && this.active === 'submissions') {
      console.log('handling ctrl+f');
      event.preventDefault();

      const el = this.searchInput.nativeElement;

      el.scrollIntoView();
      el.focus();

      return false;
    }

    return true;
  }

  loadAnswers() {
    if (this.answerLoadAttempted) {
      return;
    }

    this.answerLoadAttempted = true;

    this.submissionService.answers(this.marathonService.marathon.id).subscribe((answers) => {
      for (const answer of answers) {
        if (!this.answers.has(answer.username)) {
          this.answers.set(answer.username, []);
        }

        this.answers.get(answer.username).push(answer);
      }
    });
  }

  switchTab(newTab: AllowedTabs) {
    this.active = newTab;

    if (newTab === 'answers') {
      this.loadAnswers();
    }
  }

  get displaysTabs() {
    return this.marathonService.isAdmin(this.userService.user) &&
      !!this.marathonService.marathon.questions &&
      this.marathonService.marathon.questions.length > 0;
  }

  exportToCsv() {
    this.gameService.exportAllForMarathon(this.marathonService.marathon.id);
  }

  search(value: string): void {
    this.searchTerm.next({
      term: value,
      status: this.statusFilter,
    });
  }

  deleteSubmission(id: number) {
    this.submissionService.delete(this.marathonService.marathon.id, id);
  }

  deleteGame(id: number) {
    this.gameService.delete(this.marathonService.marathon.id, id);
  }

  deleteCategory(id: number) {
    this.categoryService.delete(this.marathonService.marathon.id, id);
  }

  get isSearching(): boolean {
    return !!(this.gameFilter || this.statusFilter);
  }

  get title(): string {
    return 'Submissions';
  }

  get showDelete(): boolean {
    return !this.marathonService.marathon.selectionDone && this.userIsAdmin;
  }

  get userIsAdmin(): boolean {
    return this.marathonService.isAdmin(this.userService.user);
  }
}
