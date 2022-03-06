import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pass-change-doctor',
  templateUrl: './pass-change-doctor.component.html',
  styleUrls: ['./pass-change-doctor.component.css']
})
export class PassChangeDoctorComponent implements OnInit {

  error="Password change failed!";
  changePassForm!: FormGroup;
  currentUser!:any;
  submitted = false;
  constructor(private token:TokenStorageService, private notifyService:NotificationService, private userService:UserService) { }
  
  
  showToasterSuccess(){
    this.notifyService.showSuccess("Parola schimbata cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.changePassForm = new FormGroup({
      old_pass: new FormControl('',[Validators.required,Validators.minLength(8)]),
      new_pass: new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

  onSubmit(changePassForm: FormGroup){
    this.submitted=true;
    if(changePassForm.valid){
      this.userService.updatePassword(this.currentUser.email,this.changePassForm.get('new_pass')!.value).subscribe({
        next: async (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          changePassForm.reset();
          this.submitted = false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

}
