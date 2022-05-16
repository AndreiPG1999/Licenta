import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

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
  constructor(private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Update realizat cu succes !!")
  }
  ngOnInit(): void {
    this.updateLastNameform = new FormGroup({
      last_name: new FormControl('')
    });
    this.updateFirstNameform = new FormGroup({
      first_name: new FormControl('')
    });
    this.updateNrTelefonform = new FormGroup({
      nr_telefon: new FormControl('')
    });
    this.currentUser = this.token.getUser();
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
      var last_name = document.getElementById('last_name') as HTMLInputElement;
      this.userService.updateLastName(this.loggedInUser.email, last_name.value).subscribe({
        next: async (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
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
      var first_name = document.getElementById('first_name') as HTMLInputElement;
      this.userService.updateFirstName(this.loggedInUser.email, first_name.value).subscribe({
        next: async (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
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
      var nr_telefon = document.getElementById('nr_telefon') as HTMLInputElement;
      this.userService.updateNrTel(this.loggedInUser.email, nr_telefon.value).subscribe({
        next: async (response: User) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          window.location.reload();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
}
