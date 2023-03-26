import { Validators } from '@angular/forms';
import { VALID_CHARACTERS_PATTERN } from 'src/app/constants/constants';
import { matchValidator } from '../register/register-form-validator';

export const registerSchema = {
  username: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  firstname: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  lastname: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  email: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(25),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
      Validators.email,
    ]),
  ],
  password: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
      matchValidator('confirmPassword', true),
    ]),
  ],
  confirmPassword: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
      matchValidator('password'),
    ]),
  ],
};
