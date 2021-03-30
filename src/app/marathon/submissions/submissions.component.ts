import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../../model/game';
import { faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { MarathonService } from '../../../services/marathon.service';
import { DurationService } from '../../../services/duration.service';
import { UserService } from '../../../services/user.service';
import { Submission } from '../../../model/submission';
import { GameService } from '../../../services/game.service';
import { SubmissionService } from '../../../services/submission.service';
import { CategoryService } from '../../../services/category.service';
import {User} from '../../../model/user';

@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.scss']
})
export class SubmissionsComponent implements OnInit {

  public submissions: Submission[];
  public selection: Map<number, Selection>;

  public runnerGameFilter = '';
  public categoryFilter = '';

  public active = 'submissions';

  public faTimes = faTimes;
  public faSearch = faSearch;

  public moment = moment;

  constructor(private route: ActivatedRoute,
              public marathonService: MarathonService,
              public userService: UserService,
              public gameService: GameService,
              private submissionService: SubmissionService,
              private categoryService: CategoryService) {
    this.submissions = this.route.snapshot.data.submissions;
    this.selection = this.route.snapshot.data.selection;
    this.submissions.forEach(submission => {
      submission.answers = submission.answers.filter(answer => answer.question.fieldType !== 'FREETEXT');
      submission.games.forEach(game => {
        game.visible = true;
        game.categories.forEach(category => {
          category.estimateHuman = DurationService.toHuman(category.estimate);
          category.visible = true;
        });
      });
    });
  }

  ngOnInit() {
  }

  displaysTabs() {
    return this.marathonService.isAdmin(this.userService.user) &&
      !!this.marathonService.marathon.questions &&
      this.marathonService.marathon.questions.length > 0;
  }

  exportToCsv() {
    this.gameService.exportAllForMarathon(this.marathonService.marathon.id);
  }

  filter() {
    this.submissions.forEach((submission) => {
      submission.games.forEach(game => {
        game.categories.forEach(category => {
          category.visible = !this.categoryFilter || this.selection[category.id].status === this.categoryFilter;
        });
        game.visible = this.filterGame(game, submission.user);
      });
    });
  }

  private filterGame(game: Game, user: User) {
    if (!this.runnerGameFilter && !this.categoryFilter) {
      return true;
    }

    const filter = this.runnerGameFilter;
    let visible = true;

    const gameFound = game.name.toLowerCase().includes(filter.toLowerCase());

    if (gameFound) {
      visible = visible && game.name.toLowerCase().includes(filter.toLowerCase());
    } else {
      if (localStorage.getItem('language') === 'ja' && !!user.usernameJapanese) {
        visible = visible && user.usernameJapanese.toLowerCase().includes(filter.toLowerCase());
      } else {
        visible = visible && user.username.toLowerCase().includes(filter.toLowerCase());
      }
    }

    visible = visible && game.categories.map(c => c.visible).includes(true);

    return visible;
  }

  showSubmission(submission: Submission) {
    return submission.games.find(g => g.visible);
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
