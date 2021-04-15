import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideAnimation } from './animations';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { PresenceService } from './_services/presence.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideAnimation],
})
export class AppComponent implements OnInit {
  title = 'FindYourMatch';
  users: any;

  constructor(private accountService: AccountService, private presence: PresenceService) {}

  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
