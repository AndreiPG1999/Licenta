import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Radiografie } from '../radiografie';
import { RadiografieService } from '../radiografie.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-radiografii',
  templateUrl: './radiografii.component.html',
  styleUrls: ['./radiografii.component.css']
})
export class RadiografiiComponent implements OnInit {

  images !: any[];
  base64Data: any;
  retrieveResponse: any;
  radiografii !: Radiografie[];
  currentUser !: any;
  image !: any;
  constructor(private radiografieService:RadiografieService, private token:TokenStorageService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.radiografieService.getRadiografie(this.currentUser.email).subscribe({
      next: async (response:Radiografie[]) => {
        this.radiografii = response;
        console.log(this.radiografii);
        this.convertImg();
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      }
    })
    
  }
  convertImg():void{
    // for(let radiografie of this.radiografii){
    //   this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + radiografie.picByte));
    // }
    this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.radiografii[3].picByte);
    console.log(this.image);

  }
}
