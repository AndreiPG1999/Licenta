import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
  display="none";
  formularModal !: Formular;
  afectiuniSplitted !: any
  alergiiSplitted !: any

  constructor(private router:Router, private userService:UserService, private notifyService:NotificationService, private token:TokenStorageService, private formularService:FormularService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
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
  }

  public getFormulars(): void {
    this.formularService.findFormularById(this.loggedInUser.id).subscribe({
      next:(response: Formular[]) => {
        this.formulars = response;
        console.log(this.formulars);
        this.openModal(this.formulars[0]);
        this.onCloseModal();
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
  public openModal(formularModal:Formular): void{
    this.display = "block";
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', '#formularModal');

    this.afectiuniSplitted = formularModal.afectiuni.split(",");
    this.afectiuniSplitted.pop();
    this.alergiiSplitted = formularModal.alergii.split(",");
    this.alergiiSplitted.pop();

    this.formularModal = formularModal;
    container?.appendChild(button);
    button.click();
    
  }
  public onCloseModal(): void{
    this.display = "none";
  }
}
