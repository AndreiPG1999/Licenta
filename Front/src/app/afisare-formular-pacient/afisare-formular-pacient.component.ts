import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router, private userService:UserService, private formularService:FormularService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    this.formularService.findFormular(this.currentUser.email).subscribe({
      next:(response: Formular) => {
        this.currentFormular = response;
        console.log(this.currentFormular.length);
        this.afectiuniSplitted = this.currentFormular.afectiuni.split(",");
        this.afectiuniSplitted.pop();
        console.log(this.afectiuniSplitted);
        this.alergiiSplitted = this.currentFormular.alergii.split(",");
        this.alergiiSplitted.pop();
        console.log(this.alergiiSplitted);
      },
      error: () => {
      }
    })
  }

  public onDeleteFormular(){
    if(confirm("Sigur doriți să ștergeți acest formular?")){
      this.formularService.deleteFormular(this.currentFormular.email).subscribe({
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
