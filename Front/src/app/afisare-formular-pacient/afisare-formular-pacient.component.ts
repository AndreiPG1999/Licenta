import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-afisare-formular-pacient',
  templateUrl: './afisare-formular-pacient.component.html',
  styleUrls: ['./afisare-formular-pacient.component.css']
})
export class AfisareFormularPacientComponent implements OnInit {

  currentUser !: any
  currentFormular !: any
  afectiuniSplitted !: any
  alergiiSplitted !: any
  constructor(private userService:UserService, private formularService:FormularService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.formularService.findFormular(this.currentUser.email).subscribe({
      next:(response: Formular) => {
        this.currentFormular = response;
        console.log(this.currentFormular);
        this.afectiuniSplitted = this.currentFormular.afectiuni.split(",");
        this.afectiuniSplitted.pop();
        console.log(this.afectiuniSplitted);
        this.alergiiSplitted = this.currentFormular.alergii.split(",");
        this.alergiiSplitted.pop();
        console.log(this.alergiiSplitted);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

}
