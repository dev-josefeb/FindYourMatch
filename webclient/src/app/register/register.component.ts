import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @Input() users: any;

  model: any = {};

  constructor() {}

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
  }
}
