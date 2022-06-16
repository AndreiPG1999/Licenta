import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Acces } from '../acces';
import { AccesService } from '../acces.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-acces',
  templateUrl: './acces.component.html',
  styleUrls: ['./acces.component.css']
})
export class AccesComponent implements OnInit {

  accesForm !: FormGroup;
  currentUser !:any;
  loggedInUser !: any;
  users !: User[];
  submitted = false;
  constructor(private token:TokenStorageService, private accesService:AccesService, private userService:UserService, private notifyService:NotificationService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Accesul utilizatorului a fost modificat !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.accesForm = new FormGroup({
      email: new FormControl(''),
      id_doctor: new FormControl(''),
      adaugareTratament: new FormControl('', Validators.required),
      stergereCont: new FormControl('', Validators.required),
      afisareFormular: new FormControl('', Validators.required)
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.userService.findUsersByEmail(this.loggedInUser.id).subscribe({
          next:(response: User[]) => {
            this.users = response;
            console.log(this.users);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  onSubmit(accesForm:FormGroup){
    this.submitted = true;
    if(accesForm.valid)
    {
      this.accesForm.value['id_doctor'] = this.loggedInUser.id;
      this.accesService.deleteAcces(this.accesForm.value['email']).subscribe({
        next: () => {
          console.log("deleted");
          this.accesService.addAcces(accesForm.value).subscribe({
            next:async (response: Acces) => {
              console.log(this.users);
              this.showToasterSuccess();
              await new Promise(f => setTimeout(f, 1000));
              window.location.reload();
              this.submitted = false;
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
          });
        }
      });
      
    }
  }
}
