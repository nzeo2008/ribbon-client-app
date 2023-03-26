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
  protected registerForm: FormGroup;
  protected hidePassword: boolean = true;
  protected hideConfirm: boolean = true;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    protected validator: ValidatorService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.tokenStorage.getUser()) {
      this.router.navigate(['/']);
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
          this.notificationService.showSnackBar('Успешная регистрация');
        },

        error: (error) => {
          this.notificationService.showSnackBar(
            `Ошибка при регистрации: ${error}`
          );
        },
      });
  }
}
