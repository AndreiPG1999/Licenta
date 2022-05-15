import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.css']
})
export class FormularComponent implements OnInit {

  formularForm !: FormGroup
  currentUser !: any
  loggedInUser !: any
  submitted = false
  constructor(private notifyService:NotificationService, private token:TokenStorageService, private userService:UserService, private formularService:FormularService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Formular trimis cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.formularForm = new FormGroup({
      email: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      data_nasterii: new FormControl(''),
      afectiuni: new FormControl(''),
      sangerari: new FormControl('', Validators.required),
      alergii: new FormControl(''),
      alcool: new FormControl('', Validators.required),
      fumator: new FormControl('', Validators.required),
      droguri: new FormControl('', Validators.required)
    })
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  async onSubmit(formularForm:FormGroup){
    this.submitted = true;
    if(formularForm.valid){
      this.formularForm.value['email'] = this.currentUser.email;
      this.formularForm.value['first_name'] = this.loggedInUser.first_name;
      this.formularForm.value['last_name'] = this.loggedInUser.last_name;
      this.formularService.addFormular(formularForm.value).subscribe({
        next:async (response: Formular) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          window.location.reload();
          this.submitted = false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }

}
