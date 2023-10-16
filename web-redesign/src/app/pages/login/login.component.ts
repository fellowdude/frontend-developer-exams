import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/api/login/login.service';
import { HeaderToggleService } from 'src/app/shared/services/internal/header-toggle/header-toggle.service';
import { ToastService } from 'src/app/shared/services/internal/toast/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    remember: new FormControl(false),
  })

  constructor( private headerToggleService: HeaderToggleService, private loginService: LoginService, private router: Router, private toastService: ToastService) {
    this.headerToggleService.changeHeaderToggle(false);
  }

  ngOnInit(): void {
    if(localStorage.getItem('username')){
      this.loginForm.get('username')?.setValue(localStorage.getItem('username'));
      this.loginForm.get('remember')?.setValue(true);
    }
  }

  login(): void {
    if(this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          if(this.loginForm.get('remember')?.value){
            localStorage.setItem('username', this.loginForm.get('username')?.value);
            localStorage.setItem('token', response.token);
          }else{
            sessionStorage.setItem('token', response.token);
          }
          this.loginForm.reset();
          this.toastService.show('Welcome, ' + response.username+'!', { classname: 'bg-success text-light', delay: 5000 });
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.toastService.show(error.message, { classname: 'bg-danger text-light', delay: 5000 });
        }
      })
    }
  }
}
