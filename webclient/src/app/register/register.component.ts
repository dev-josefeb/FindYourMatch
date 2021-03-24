import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() users: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor() {}

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
