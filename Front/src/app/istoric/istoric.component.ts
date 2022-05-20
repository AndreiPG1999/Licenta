import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private istoricService:IstoricService, private token:TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getIstoric();
  }

  public getIstoric(): void {
    this.istoricService.getIstorics().subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        console.log(this.istorics);
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
