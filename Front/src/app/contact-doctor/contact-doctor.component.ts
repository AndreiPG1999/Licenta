import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { emailValidator } from '../validators/register-email.validator';

@Component({
  selector: 'app-contact-doctor',
  templateUrl: './contact-doctor.component.html',
  styleUrls: ['./contact-doctor.component.css']
})
export class ContactDoctorComponent implements OnInit {

  contactForm!: FormGroup
  submitted = false
  constructor(private notifyService:NotificationService, private userService:UserService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Your message was submitted successfully !!")
  }
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email], emailValidator(this.userService)),
      message: new FormControl('',[Validators.required])
    });
  }

  async onSubmit(contactForm: FormGroup){
    this.submitted = true;
    if(contactForm.valid){
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      contactForm.reset();
      this.submitted=false;
    }
  }

}
