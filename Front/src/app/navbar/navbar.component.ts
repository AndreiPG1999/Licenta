import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Acces } from '../acces';
import { AccesService } from '../acces.service';
import { FormularService } from '../formular.service';
import { IstoricService } from '../istoric.service';
import { NotificationService } from '../notification.service';
import { Radiografie } from '../radiografie';
import { RadiografieService } from '../radiografie.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarPacientComponent implements OnInit {

  currentUser!:any;
  display = "none";
  selectedFile !:File;
  addRadiografieForm !: FormGroup;
  loggedInUser !: any;
  accesList !: Acces;
  constructor(private accesService:AccesService, private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router, private formularService:FormularService, private istoricService:IstoricService, private radiografieService:RadiografieService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Cont sters cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.addRadiografieForm = new FormGroup({
      email: new FormControl(''),
      id_doctor: new FormControl('')
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    this.getAcces();
  }
  clickMethod(){
    if(confirm("Sunteți sigur că doriți să ștergeți contul?")){
      this.userService.deleteUser(this.currentUser.email).subscribe({
        next: async () => {
          this.showToasterSuccess();
          this.deleteFormular();
          this.deleteIstoric();
          await new Promise(f => setTimeout(f, 2000));
          this.router.navigate(['/login']);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public getAcces(){
    this.accesService.findAcces(this.currentUser.email).subscribe({
      next:async (response: Acces) => {
        this.accesList = response;
        console.log(this.accesList);
      }
    });
  }

  public deleteFormular(){
    this.formularService.deleteFormular(this.currentUser.email).subscribe({
    });
  }
  public deleteIstoric(){
    this.istoricService.deleteIstoric(this.currentUser.email).subscribe({
    });
  }

  public onCloseModal(){
    this.display = "none";
  }
  public onOpenModal(){
    this.display = "block";
  }
  public onFileChanged(event : any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.addRadiografieForm.value['email'] = this.loggedInUser.email;
    this.addRadiografieForm.value['id_doctor'] = this.loggedInUser.id_doctor;
    this.radiografieService.addRadiografie(uploadImageData, this.addRadiografieForm.value['email'], this.addRadiografieForm.value['id_doctor']).subscribe({
      next:async (response: Radiografie) => {
        console.log(response);
      },
      error: (error:HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
