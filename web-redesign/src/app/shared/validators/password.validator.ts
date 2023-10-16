import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordCompare(password: string, passwordConfirm: string): ValidatorFn {
  return (controls: AbstractControl) => {
    const control = controls?.get(password);
    const checkControl = controls?.get(passwordConfirm);

    if ( control?.value === checkControl?.value ) {
      return null;
    } else {
      return { passwordDifferent: true };
    }
  };
}
