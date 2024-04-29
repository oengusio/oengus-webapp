import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfile } from '../../../model/user-profile';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  public user: UserProfile | null = null;
  public dialogOpen = false;

  public statusFilter = [
    {
      title: 'VALIDATED',
      selected: true
    },
    {
      title: 'BONUS',
      selected: true
    },
    {
      title: 'BACKUP',
      selected: true
    },
    {
      title: 'REJECTED',
      selected: true
    },
    {
      title: 'TODO',
      selected: true
    }
  ];

  public dateFilter = [
    {
      title: 'FUTURE',
      selected: true
    },
    {
      title: 'PAST',
      selected: true
    }
  ];

  constructor(private route: ActivatedRoute, public userService: UserService) {
    this.route.data.subscribe(routeData => {
      this.updateUser(routeData.user);
    });
  }

  updateUser(user: UserProfile): void {
    this.user = user;
  }

  get isAdmin(): boolean {
    if (!this.userService.isLoggedIn()) {
      return false;
    }

    return this.userService.isAdmin();
  }

  get isSelf(): boolean {
    if (!this.userService.isLoggedIn()) {
      return false;
    }

    return this.userService.user.id === this.user.id;
  }

  get title(): string {
    return this.user.username;
  }
}
