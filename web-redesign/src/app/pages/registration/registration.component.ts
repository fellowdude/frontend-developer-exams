import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/api/login/login.service';
import { UserService } from 'src/app/shared/services/api/user/user.service';
import { HeaderToggleService } from 'src/app/shared/services/internal/header-toggle/header-toggle.service';
import { ToastService } from 'src/app/shared/services/internal/toast/toast.service';
import { passwordCompare } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  }, {
    validators: [passwordCompare('password','passwordConfirm')]
  })

  constructor( private headerToggleService: HeaderToggleService, private userService: UserService, private loginService: LoginService, private router: Router, private toastService: ToastService) {
    this.headerToggleService.changeHeaderToggle(false);
  }

  register(): void {
    if(this.registrationForm.valid){
      this.userService.registerUser(this.registrationForm.value).subscribe({
        next: (response) => {
          this.loginService.login(this.registrationForm.value).subscribe({
            next: (response) => {
              this.toastService.show('Welcome, ' + this.registrationForm.get('username')?.value, { classname: 'bg-success text-light', delay: 5000 });
              this.router.navigate(['/']);
            }
          })
        },
        error: (error) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 5000 });
        }
      })
    }
  }
}
