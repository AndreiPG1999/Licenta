import { KeyValue } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  radiografii !:KeyValue<keyof KeyValue<String, Byte[]>, String | number[]>;
  users !: User[];
  radiografieModal !: KeyValue<keyof KeyValue<String, Byte[]>, String | number[]>;
  display="none";
  images !: any[];
  values !: KeyValue<keyof KeyValue<String, Byte[]>, String | number[]>[];
  
  constructor(private userService:UserService, private token:TokenStorageService, private radiografieService:RadiografieService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getRadiografii();
        
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
   
  }
  // public convertImg():void{
  //   for(let val of this.values){
  //     this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + val));
  //     console.log(this.images);
  //   }
  // }
  public getRadiografii(): void {
    this.radiografieService.getRadiografieByID(this.loggedInUser.id).subscribe({
      next:(response: KeyValue<keyof KeyValue<String, Byte[]>, String | number[]>) => {
        this.radiografii = response;
        console.log(this.radiografii);
        this.values = Object.values(this.radiografii);
        console.log(this.values);
        this.openRadiografiiModal(this.radiografii);
        this.onCloseModal();
        // this.convertImg();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public openRadiografiiModal(radiografie:KeyValue<keyof KeyValue<String, Byte[]>, String | number[]>): void{
    this.display = "block"
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', '#radiografiiModal');
    this.radiografieModal = radiografie;
    container?.appendChild(button);
    button.click();
  }
  public onCloseModal(): void{
    this.display = "none";
  }
}
