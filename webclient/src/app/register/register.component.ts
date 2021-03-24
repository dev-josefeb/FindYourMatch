import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private accountService: AccountService) {}

  register() {
    console.log(this.model);
    this.accountService.register(this.model).subscribe(
      () => this.cancel(),
      (error) => console.log(error)
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
