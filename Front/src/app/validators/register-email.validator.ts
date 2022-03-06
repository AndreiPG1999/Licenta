import { AbstractControl, AsyncValidatorFn} from "@angular/forms";
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
                return user ? {noEmail:false} : null;
            })
        )
    }
}
