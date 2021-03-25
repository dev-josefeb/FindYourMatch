import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  model: any = {};
  isCollapsed = false;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}

  login() {
    this.accountService.login(this.model).subscribe(
      () => this.router.navigateByUrl('/members'),
      (error) => console.log(error)
    );
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
