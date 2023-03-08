import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AuthService } from './../../service/auth.service';
import { NotificationService } from './../../service/notification.service';
import { loginSchema } from './../schemas/login-schema';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group(loginSchema);
  }

  submit(): void {
    this.authService
      .login({
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      })
      .subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          this.notificationService.showSnackBar('Успешный вход');
          this.router.navigate(['/']);
          window.location.reload();
        },

        error: (error) => {
          this.notificationService.showSnackBar(error.message);
        },
      });
  }
}
