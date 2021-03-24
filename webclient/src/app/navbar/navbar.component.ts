import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  isCollapsed = false;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login() {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
        this.loggedIn = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  logout() {
    this.accountService.logout();

    this.loggedIn = false;
  }

  getCurrentUser() {
    this.accountService.currentUser$.subscribe(
      (user) => {
        this.loggedIn = !!user; // !! to convert user to boolean if null
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
