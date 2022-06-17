import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-istoric',
  templateUrl: './istoric.component.html',
  styleUrls: ['./istoric.component.css']
})
export class IstoricComponent implements OnInit {

  currentUser!: any;
  istorics !: Istoric[];
  loggedInUser !: any;
  users !:User[]
  id !: number;
  doctor !: User;

  constructor(private router:Router, private istoricService:IstoricService, private token:TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
      this.getIstoric();
    }
  }

  public getIstoric(): void {
    this.istoricService.getIstoricsByEmail(this.currentUser.email).subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        this.getIstoricId();
        this.getUsers();
        console.log(this.istorics);
      }
    });
  }

  public getIstoricId(){
    for(let istoric of this.istorics)
    {
      this.id = istoric.id_doctor;
    }
  }
  public getUsers(){
    this.userService.getUsers().subscribe({
      next:(response: User[]) => {
        this.users = response;
        for(var user of this.users)
        {
          if(user.id === this.id)
          {
            this.doctor = user;
            console.log(this.doctor);
          }
          
        }
      }
    });
  }

  public searchIstoric(key: string) : void{
    const results: Istoric[] = [];
    for(const istoric of this.istorics){
      if(istoric.date.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(istoric);
      }
    }
    this.istorics = results;
    if(results.length === 0 || !key){
      this.getIstoric();
    }
  }
}
