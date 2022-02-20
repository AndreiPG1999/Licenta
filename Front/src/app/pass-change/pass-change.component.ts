import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit {

  error="Password change failed!";
  changePassForm!: FormGroup;
  userService!:UserService;
  submitted = false;
  currentUser!:User;
  constructor(private authService:AuthService, private notifyService:NotificationService, private token:TokenStorageService) { }
  
  
  showToasterSuccess(){
    this.notifyService.showSuccess("Login successful !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.changePassForm = new FormGroup({
      old_pass: new FormControl('',[Validators.required,Validators.minLength(8)]),
      new_pass: new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

  async onSubmit(changePassForm: FormGroup){
    this.submitted=true;
    if(changePassForm.valid){
      this.userService.updateUser(changePassForm.value).subscribe({
        next: (response: User) => {
          console.log(response);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      changePassForm.reset();
    }
  }
}
