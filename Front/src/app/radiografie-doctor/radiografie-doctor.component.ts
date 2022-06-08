import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Radiografie } from '../radiografie';
import { RadiografieService } from '../radiografie.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-radiografie-doctor',
  templateUrl: './radiografie-doctor.component.html',
  styleUrls: ['./radiografie-doctor.component.css']
})
export class RadiografieDoctorComponent implements OnInit {

  currentUser !: any;
  loggedInUser !: any;
  radiografii !:Radiografie[];
  users !: User[];
  user !: User;
  display="none";
  constructor(private userService:UserService, private token:TokenStorageService, private radiografieService:RadiografieService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getRadiografii();
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public getRadiografii(): void {
    this.radiografieService.getAllRadiografii().subscribe({
      next:(response: Radiografie[]) => {
        this.radiografii = response;
        console.log(this.radiografii);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public getUsers(): void {
    this.userService.findUsersByTypePacienti(this.loggedInUser.id).subscribe({
      next:(response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  public searchUsers(key: string) : void{
    const results: User[] = [];
    for(const neededUser of this.users){
      if(neededUser.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
      neededUser.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      neededUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(neededUser);
      }
    }
    this.users = results;
    if(!key){
      this.getUsers();
    }
  }

  public openRadiografiiModal(user:User): void{
    this.display = "block"
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', '#radiografiiModal');
    this.user = user;
    container?.appendChild(button);
    button.click();
    
  }
  public onCloseModal(): void{
    this.display = "none";
  }
}
