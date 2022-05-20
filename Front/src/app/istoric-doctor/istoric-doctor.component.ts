import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { forkJoin, mergeMap } from 'rxjs';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-istoric-doctor',
  templateUrl: './istoric-doctor.component.html',
  styleUrls: ['./istoric-doctor.component.css']
})
export class IstoricDoctorComponent implements OnInit {

  currentUser!: any;
  istorics !: Istoric[];
  loggedInUser!: any;

  constructor(private istoricService:IstoricService, private token:TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getIstoric();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    
  }

  public getIstoric(): void {
    this.istoricService.findIstoricById(this.loggedInUser.id).subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        console.log(this.istorics);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public searchIstoric(key: string) : void{
    const results: Istoric[] = [];
    for(const istoric of this.istorics){
      if(istoric.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 || istoric.date.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(istoric);
      }
    }
    this.istorics = results;
    if(results.length === 0 || !key){
      this.getIstoric();
    }
  }
}
