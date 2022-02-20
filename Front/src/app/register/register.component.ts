import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { User } from '../user';
import { UserService } from '../user.service';
import { registerEmailValidator } from '../validators/register-email.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!:FormGroup
  submitted=false;
  constructor(private user: UserService, private userService: UserService, private router:Router, private notifyService : NotificationService) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      first_name: new FormControl('',Validators.required),
      last_name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email], registerEmailValidator(this.userService)),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      nr_telefon: new FormControl('',[Validators.required])
    });
  }

  showToasterSuccess(){
    this.notifyService.showSuccess("Registration successful !!")
}
  async onRegister(registerForm: FormGroup): Promise<void>{
    this.submitted=true;
    if(registerForm.valid)
    {
      this.userService.addUser(registerForm.value).subscribe({
        next:(response: User) => {
          console.log(response);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      this.router.navigate(['/login'], {queryParams: { registered: 'true' } });
    }
  } 
}
