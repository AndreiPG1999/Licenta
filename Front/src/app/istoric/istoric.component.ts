import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-istoric',
  templateUrl: './istoric.component.html',
  styleUrls: ['./istoric.component.css']
})
export class IstoricComponent implements OnInit {

  currentUser!: any;
  istorics !: Istoric[];

  constructor(private istoricService:IstoricService, private token:TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getIstoric();
  }

  public getIstoric(): void {
    this.istoricService.getIstorics().subscribe({
      next:(response: Istoric[]) => {
        this.istorics = response;
        console.log(this.istorics);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
