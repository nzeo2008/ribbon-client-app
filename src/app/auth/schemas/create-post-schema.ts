import { Validators } from '@angular/forms';
import { VALID_CHARACTERS_PATTERN } from 'src/app/constants/constants';

export const createPostSchema = {
  title: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  caption: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(300),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  location: [
    '',
    Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(30),
      Validators.pattern(VALID_CHARACTERS_PATTERN),
    ]),
  ],
  file: ['', Validators.compose([Validators.required])],
};
