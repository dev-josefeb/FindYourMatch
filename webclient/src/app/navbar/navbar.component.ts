import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  isCollapsed = true;
  unreadMessages = 0;

  constructor(public accountService: AccountService, private toastr: ToastrService, private router: Router, private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getMessages(1, 10, 'Unread').subscribe((response) => {
      this.unreadMessages = response.result.length;
    });
  }

  login() {
    this.accountService.login(this.model).subscribe(() => this.router.navigateByUrl('/members'));
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
