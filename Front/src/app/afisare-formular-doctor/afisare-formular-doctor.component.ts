import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-afisare-formular-doctor',
  templateUrl: './afisare-formular-doctor.component.html',
  styleUrls: ['./afisare-formular-doctor.component.css']
})
export class AfisareFormularDoctorComponent implements OnInit {

  public users!: User[];
  currentUser!: any;
  loggedInUser!: any;
  public formulars !: Formular[];

  constructor(private userService:UserService, private notifyService:NotificationService, private token:TokenStorageService, private formularService:FormularService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getFormulars();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public getFormulars(): void {
    this.formularService.findFormularById(this.loggedInUser.id).subscribe({
      next:(response: Formular[]) => {
        this.formulars = response;
        console.log(this.formulars);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchFormulars(key: string) : void{
    const results: Formular[] = [];
    for(const formular of this.formulars){
      if(formular.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
      formular.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      formular.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(formular);
      }
    }
    this.formulars = results;
    if(!key){
      this.getFormulars();
    }
  }

  public onDeleteFormular(formular:Formular){
    if(confirm("Sigur doriți să ștergeți acest formular?")){
      this.formularService.deleteFormular(formular.email).subscribe({
        next: async () => {
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
