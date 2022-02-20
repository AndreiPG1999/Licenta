import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-pass-change-doctor',
  templateUrl: './pass-change-doctor.component.html',
  styleUrls: ['./pass-change-doctor.component.css']
})
export class PassChangeDoctorComponent implements OnInit {

  error="Password change failed!";
  changePassForm!: FormGroup;
  userService!:UserService;
  submitted = false;
  constructor(private authService:AuthService, private notifyService:NotificationService) { }
  
  
  showToasterSuccess(){
    this.notifyService.showSuccess("Login successful !!")
  }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      old_pass: new FormControl('',[Validators.required,Validators.minLength(8)]),
      new_pass: new FormControl('',[Validators.required,Validators.minLength(8)])
    });
  }

  onSubmit(changePassForm: FormGroup){
    this.submitted=true;
    if(changePassForm.valid){
      console.log("bravo tata");
    }
  }

}
