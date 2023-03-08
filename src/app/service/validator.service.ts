import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  getErrorMessage(form: AbstractControl<any>, name: string): string {
    const value = form.get(name);

    switch (true) {
      case value?.hasError('required'):
        return 'Обязательное поле';
      case value?.hasError('email'):
        return 'Неверно введён email';
      case value?.hasError('minlength'):
        return `Минимальная длина ${
          value?.getError('minlength')?.requiredLength
        } символа`;
      case value?.hasError('maxlength'):
        return `Максимальная длина ${
          value?.getError('maxlength')?.requiredLength
        } символов`;
      case value?.hasError('pattern'):
        return `Недопустимые символы: ${
          value?.getError('pattern')?.actualValue
        }`;
      case value?.hasError('matching'):
        return 'Пароли не совпадают';
      default:
        return '';
    }
  }
}
