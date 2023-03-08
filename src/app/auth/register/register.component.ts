import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { NotificationService } from 'src/app/service/notification.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { registerSchema } from './../schemas/register-schema';
import { ValidatorService } from './../../service/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm: FormGroup;
  protected hidePassword = true;
  protected hideConfirm = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder,
    protected validator: ValidatorService
  ) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['main']);
    }
  }

  createRegisterForm(): FormGroup {
    return this.fb.group(registerSchema);
  }

  ngOnInit(): void {
    this.registerForm = this.createRegisterForm();
  }

  submit(): void {
    this.authService
      .register({
        username: this.registerForm.value.username,
        firstname: this.registerForm.value.firstname,
        lastname: this.registerForm.value.lastname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword,
      })
      .subscribe({
        next: (data) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          this.notificationService.showSnackBar('Успешная регистрация');
          this.router.navigate(['/']);
          window.location.reload();
        },

        error: (error) => {
          this.notificationService.showSnackBar(error.message);
        },
      });
  }
}
