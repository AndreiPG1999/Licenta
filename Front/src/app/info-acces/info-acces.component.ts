import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Acces } from '../acces';
import { AccesService } from '../acces.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-info-acces',
  templateUrl: './info-acces.component.html',
  styleUrls: ['./info-acces.component.css']
})
export class InfoAccesComponent implements OnInit {

  users !: User[];
  currentUser !: any;
  loggedInUser!: any;
  accesList !: Acces[];
  
  constructor(private userService:UserService, private token:TokenStorageService, private accesService:AccesService, private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
      this.userService.findUser(this.currentUser.email).subscribe({
        next:(response: User) => {
          this.loggedInUser = response;
          console.log(this.loggedInUser);
          this.getAcces();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public getAcces(): void{
    this.accesService.findAccesById(this.loggedInUser.id).subscribe({
      next:(response: Acces[]) => {
        this.accesList = response;
        console.log(this.accesList);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchAcces(key: string) : void{
    const results: Acces[] = [];
    for(const acces of this.accesList){
      if(acces.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(acces);
      }
    }
    this.accesList = results;
    if(!key){
      this.getAcces();
    }
  }
}
