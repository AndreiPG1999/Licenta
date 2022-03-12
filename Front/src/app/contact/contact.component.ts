import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';
import { NotificationService } from '../notification.service';
import { UserService } from '../user.service';
import { emailValidator } from '../validators/register-email.validator';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  mail:Email = new Email();
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
  private sendEmail(){
    this.userService.sendEmail(this.mail).subscribe(data=>console.log(data));
  }

  async onSubmit(contactForm: FormGroup){
    this.submitted = true;
    if(contactForm.valid){
      this.sendEmail();
      this.showToasterSuccess();
      await new Promise(f => setTimeout(f, 1000));
      contactForm.reset();
      this.submitted=false;
    }
  }

}
