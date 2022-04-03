import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-contact-doctor',
  templateUrl: './contact-doctor.component.html',
  styleUrls: ['./contact-doctor.component.css']
})
export class ContactDoctorComponent implements OnInit {

  mail:Email = new Email();
  contactForm!: FormGroup
  submitted = false
  currentUser!:any
  constructor(private notifyService:NotificationService, private userService:UserService, private token:TokenStorageService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Mesaj trimis cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.contactForm = new FormGroup({
      name: new FormControl('',[Validators.required]),
      message: new FormControl('',[Validators.required])
    })
  }

  onSubmit(contactForm: FormGroup){
    this.mail.name = this.contactForm.get('name')!.value
    this.mail.email = this.currentUser.email
    this.mail.message = this.contactForm.get('message')!.value;
    this.submitted = true;
    if(contactForm.valid){
      this.userService.sendEmail(this.mail).subscribe({
        next:async (response: Email) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          contactForm.reset();
          this.submitted=false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
      
    }
  }

}
