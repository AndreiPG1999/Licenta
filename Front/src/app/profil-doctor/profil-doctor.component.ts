import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil-doctor',
  templateUrl: './profil-doctor.component.html',
  styleUrls: ['./profil-doctor.component.css']
})
export class ProfilDoctorComponent implements OnInit {

  currentUser!: any;
  loggedInUser!: any;
  first_name!: string;
  last_name!: string;
  id!: number;
  updateLastNameform !: FormGroup;
  updateFirstNameform !: FormGroup;
  updateNrTelefonform !: FormGroup;
  displayLast = "none";
  displayFirst = "none";
  displayNr = "none";
  submittedFirst = false;
  submittedLast = false;
  submittedNrTelefon = false;
  constructor(private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Update realizat cu succes !!")
  }
  ngOnInit(): void {
    this.updateLastNameform = new FormGroup({
      last_name: new FormControl('',Validators.required)
    });
    this.updateFirstNameform = new FormGroup({
      first_name: new FormControl('',Validators.required)
    });
    this.updateNrTelefonform = new FormGroup({
      nr_telefon: new FormControl('',Validators.required)
    });
    this.currentUser = this.token.getUser();
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
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
  }

  public onOpenLastNameModal(){
    this.displayLast = "block";
  }

  public onOpenFirstNameModal(){
    this.displayFirst = "block";
  }
  public onOpenNrTelefonModal(){
    this.displayNr = "block";
  }

  public onCloseLastModal(){
    this.displayLast = "none";
  }

  public onCloseFirstModal(){
    this.displayFirst = "none";
  }

  public onCloseNrModal(){
    this.displayNr = "none";
  }

  public updateLastName(updateLastNameform:FormGroup){
    this.submittedLast = true;
    if(updateLastNameform.valid)
    {  
      this.userService.updateLastName(this.loggedInUser.email, updateLastNameform.value).subscribe({
        next: (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          window.location.reload();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    else{
      updateLastNameform.reset();
    }
  }

  public updateFirstName(updateFirstNameform:FormGroup){
    this.submittedFirst = true;
    if(updateFirstNameform.valid)
    {  
      this.userService.updateFirstName(this.loggedInUser.email, updateFirstNameform.value).subscribe({
        next: (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          window.location.reload();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public updateNrTelefon(updateNrTelefonform:FormGroup){
    this.submittedNrTelefon = true;
    if(updateNrTelefonform.valid)
    {  
      this.userService.updateNrTel(this.loggedInUser.email, updateNrTelefonform.value).subscribe({
        next: (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          window.location.reload();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
}
