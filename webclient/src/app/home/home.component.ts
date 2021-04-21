import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit(): void {
    let currentUser: User;

    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (currentUser = user));
    if (currentUser) this.router.navigateByUrl('/members');
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
