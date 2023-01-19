import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { MarathonService } from '../../../services/marathon.service';
import { DurationService } from '../../../services/duration.service';
import { UserService } from '../../../services/user.service';
import { Submission } from '../../../model/submission';
import { GameService } from '../../../services/game.service';
import { SubmissionService } from '../../../services/submission.service';
import { CategoryService } from '../../../services/category.service';
import { Question } from 'src/model/question';
import { Answer } from '../../../model/answer';
import { debounce } from 'lodash';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', {static: true}) searchInput: ElementRef<HTMLInputElement>;

  public canLoadMore = true;
  private lastPageLoaded = 0;
  public submissions: Submission[] = [];
  public filteredSubmissions: Submission[] = [];
  public selection: Map<number, Selection>;
  public questions: Map<number, Question>;
  // username -> answers
  public answers: Map<string, Answer[]>;

  public runnerGameFilter = '';
  public categoryFilter = '';

  public active = 'submissions';

  public faTimes = faTimes;
  public faSearch = faSearch;

  public moment = moment;

  private searchDebounced = debounce(this.search, 500);

  private observer = new IntersectionObserver((entries) => {
    if (entries[0] && entries[0].isIntersecting) {
      this.loadNextSubmissionPage();
    }
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 1.0
  });

  constructor(private route: ActivatedRoute,
              public marathonService: MarathonService,
              public userService: UserService,
              public gameService: GameService,
              private submissionService: SubmissionService,
              private categoryService: CategoryService) {
    // this.submissions = this.route.snapshot.data.submissions;
    this.selection = this.route.snapshot.data.selection;
    this.answers = new Map<string, Answer[]>();
    this.questions = new Map<number, Question>();

    // map all the answers to the username
    const answers = this.route.snapshot.data.answers as Answer[];

    for (const answer of answers) {
      if (!this.answers.has(answer.username)) {
        this.answers.set(answer.username, []);
      }

      this.answers[answer.username].push(answer);
    }

    // Yucky, should not be done when questions are not needed
    this.marathonService.marathon.questions.forEach((question) => {
      if (question.fieldType === 'FREETEXT') {
        return;
      }

      this.questions[question.id] = question;
    });
    this.submissions.forEach(submission => {
      submission.games.forEach(game => {
        game.visible = true;
        game.categories.forEach(category => {
          category.estimateHuman = DurationService.toHuman(category.estimate);
          category.visible = true;
        });
      });
    });

    this.filteredSubmissions = this.submissions;
  }

  ngOnInit() {
    window.addEventListener('keydown', this.ctrlFHandler.bind(this));

    // set-up lazy loading
    setTimeout(() => {
      this.observer.observe(document.getElementById('lazyLoadTrigger'));
    }, 0);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.ctrlFHandler.bind(this));
  }

  async loadNextSubmissionPage(): Promise<void> {
    if (!this.canLoadMore) {
      return;
    }

    const nextPage = await firstValueFrom(this.submissionService.submissions(
      this.marathonService.marathon.id,
      ++this.lastPageLoaded
    ));

    this.canLoadMore = !nextPage.empty && !nextPage.last;

    if (!nextPage.empty) {
      nextPage.content.forEach(submission => {
        submission.games.forEach(game => {
          game.visible = true;
          game.categories.forEach(category => {
            category.estimateHuman = DurationService.toHuman(category.estimate);
            category.visible = true;
          });
        });
      });

      const content = nextPage.content.filter(
        (submission) => submission.games.filter(
          (game) => game.categories.length > 0
        ).length > 0
      );

      this.submissions.push(...content);
    }
  }

  ctrlFHandler(event: KeyboardEvent): boolean {
    if (event.ctrlKey && event.key === 'f' && this.active === 'submissions') {
      event.preventDefault();

      const el = this.searchInput.nativeElement;

      el.scrollIntoView();
      el.focus();

      return false;
    }

    return true;
  }

  displaysTabs() {
    return this.marathonService.isAdmin(this.userService.user) &&
      !!this.marathonService.marathon.questions &&
      this.marathonService.marathon.questions.length > 0;
  }

  exportToCsv() {
    this.gameService.exportAllForMarathon(this.marathonService.marathon.id);
  }

  async search() {
    if (!this.runnerGameFilter && !this.categoryFilter) {
      this.filteredSubmissions = this.submissions;
      return;
    }

    const cat = this.categoryFilter ? this.categoryFilter : null;
    const foundSubmissions = await firstValueFrom(
      this.submissionService.searchSubmissions(this.marathonService.marathon.id, this.runnerGameFilter, cat)
    );

    foundSubmissions.forEach(submission => {
      submission.games.forEach(game => {
        game.visible = true;
        game.categories.forEach(category => {
          category.estimateHuman = DurationService.toHuman(category.estimate);
          category.visible = true;
        });
      });
    });

    this.filteredSubmissions = foundSubmissions;
  }

  filter() {
    this.searchDebounced();
  }

  deleteSubmission(id: number) {
    this.submissionService.delete(this.marathonService.marathon.id, id).add(() => {
      this.submissions = this.submissions.filter(submission => submission.id !== id);
    });
  }

  deleteGame(id: number, doApi: boolean = true) {
    const delFromList = () => {
      this.submissions.forEach((submission) => {
        submission.games = submission.games.filter(game => game.id !== id);
      });
    };

    if (doApi) {
      this.gameService.delete(this.marathonService.marathon.id, id).add(delFromList);
    } else {
      delFromList();
    }
  }

  deleteCategory(gameId: number, id: number) {
    this.categoryService.delete(this.marathonService.marathon.id, id).add(() => {
      this.submissions.forEach((submission) => {
        const game = submission.games.find(g => g.id === gameId);
        game.categories = game.categories.filter(c => c.id !== id);
        if (game.categories.length === 0) {
          this.deleteGame(gameId, false);
        }
      });
    });
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
