import { Validators } from '@angular/forms';
import { VALID_CHARACTERS_PATTERN } from 'src/app/constants/constants';

export const loginSchema = {
  email: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
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
    ]),
  ],
};
