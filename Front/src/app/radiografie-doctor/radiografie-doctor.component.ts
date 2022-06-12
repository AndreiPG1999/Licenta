import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  radiografieModal !: Radiografie;
  display="none";
  image !: any[];
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
  async ExecuteAsyncCode(i:number) {
    return [] as Radiografie[]
}
  public getRadiografii(): void {
    this.radiografieService.getRadiografieByID(this.loggedInUser.id).subscribe({
      next:(response: Radiografie[]) => {
        this.radiografii = response;
        console.log(this.radiografii);
        this.openRadiografiiModal(this.radiografii[1]);
        this.onCloseModal();
        this.convertImg();
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
      this.getRadiografii();
    }
  }
  async convertImg():Promise<void>{
      this.radiografii.forEach((radiografie:Radiografie) => {
        this.image.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + radiografie.picByte));
        console.log(this.image);
      })
  }

  public openRadiografiiModal(radiografie:Radiografie): void{
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
