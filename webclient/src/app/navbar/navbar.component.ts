import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';
import { PresenceService } from '../_services/presence.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  isCollapsed = true;
  unreadMessages = 0;

  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router, private messageService: MessageService, private presenceService: PresenceService) {}

  ngOnInit(): void {
    let currentUser: User;

    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (currentUser = user));
    if (currentUser) {
      this.messageService.getMessages(1, 10, 'Unread').subscribe((response) => {
        this.unreadMessages = response.result.length;
      });
    }

    this.presenceService.onNewMessage.subscribe((data) => {
      if (data !== 0) this.unreadMessages++;
      else this.unreadMessages = 0;
    });
  }

  login() {
    this.accountService.login(this.model).subscribe(() =>
      this.router.navigateByUrl('/members').finally(() => {
        this.messageService.getMessages(1, 10, 'Unread').subscribe((response) => {
          this.unreadMessages = response.result.length;
        });
      })
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
