import { FormGroup, ValidatorFn } from '@angular/forms';

export function fieldsMatchValidator(targetKey: string, toMatchKey: string): ValidatorFn {
  return (group: FormGroup) => {
    const target = group.controls[targetKey];
    const toMatch = group.controls[toMatchKey];
    return target.value === toMatch.value ? null : { 'mismatch': true };
  };
}
