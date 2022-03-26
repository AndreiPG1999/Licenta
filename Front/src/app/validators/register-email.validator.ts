import { AbstractControl, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import { map } from "rxjs";
import { UserService } from "../user.service";


export function registerEmailValidator(userService:UserService):AsyncValidatorFn{
    return (control: AbstractControl) => {
        return userService.getUsers().pipe(
            map(userService => {
                const user = userService.find(user => user.email == control.value);
                return user ? {emailExists:true} : null;
            })
        )
    }
}

export function emailValidator(userService:UserService):AsyncValidatorFn{
  return (control: AbstractControl) => {
      return userService.getUsers().pipe(
          map(userService => {
              const user = userService.find(user => user.email == control.value);
              return user ? null : {noEmail:true};
          })
      )
  }
}

export function match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (checkControl!.errors && !checkControl!.errors['matching']) {
        return null;
      }
      if (control!.value !== checkControl!.value) {
        controls.get(checkControlName)!.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
