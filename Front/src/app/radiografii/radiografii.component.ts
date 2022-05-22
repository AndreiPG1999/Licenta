import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Radiografie } from '../radiografie';
import { RadiografieService } from '../radiografie.service';

@Component({
  selector: 'app-radiografii',
  templateUrl: './radiografii.component.html',
  styleUrls: ['./radiografii.component.css']
})
export class RadiografiiComponent implements OnInit {

  image !: any;
  base64Data: any;
  retrieveResponse: any;
  radiografii !: Radiografie[];
  rad !: Radiografie;
  constructor(private radiografieService:RadiografieService, private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.radiografieService.getAll().subscribe({
      next: async (response:Radiografie[]) => {
        this.radiografii = response;
        console.log(this.radiografii);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      }
    });
    
    // this.radiografieService.getRadiografie("radiografie.jpg").subscribe({
    //   next: (response:Radiografie) => {
    //     this.retrieveResponse = response;
    //     this.base64Data = this.retrieveResponse.picByte;
    //     this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    //     + this.base64Data);
    //   },
    //   error: (error:HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // });
    // this.radiografieService.getRadiografie("salut.jpg").subscribe({
    //   next: (response:Radiografie) => {
    //     this.retrieveResponse = response;
    //     this.base64Data = this.retrieveResponse.picByte;
    //     this.image = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
    //     + this.base64Data);
    //   },
    //   error: (error:HttpErrorResponse) => {
    //     alert(error.message);
    //   }
    // });
  }

}
