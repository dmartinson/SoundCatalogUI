import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmailNotTakenValidator(control: AbstractControl) {
  return this.authService.checkEmailNotTaken(control.value)
    .then(res => {
      return res ? null : { 'emailTaken': true };
    });
}

