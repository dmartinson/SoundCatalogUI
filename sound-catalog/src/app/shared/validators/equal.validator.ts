import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export function equalValidator(control: string, controlToCompare: string): ValidatorFn {
  return (fg: FormGroup): { [key: string]: any } => {
    const value = fg.get(control).value;
    const valueToCompare = fg.get(control).value;

    return (value === valueToCompare) ? { 'mismatch': true } : null;
  };
}
