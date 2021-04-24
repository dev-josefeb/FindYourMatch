import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];

  constructor(private accountService: AccountService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();

    // Only let users above 18 years of age to register to the site
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', [Validators.required, this.checkWhitespace()]],
      knownAs: ['', Validators.required],
      dateOfBirth: ['2000-01-01', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls.password.valueChanges?.subscribe(() => this.registerForm.controls.confirmPassword.updateValueAndValidity());
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      () => this.router.navigateByUrl('/members'),
      (error) => {
        this.validationErrors = error;
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : { isMatching: true };
    };
  }

  checkWhitespace(): ValidatorFn {
    return (control: AbstractControl) => {
      return !control.value.toString().includes(' ') ? null : { hasWhitespace: true };
    };
  }
}
