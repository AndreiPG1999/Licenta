import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Acces } from '../acces';
import { AccesService } from '../acces.service';
import { FormularService } from '../formular.service';
import { IstoricService } from '../istoric.service';
import { NotificationService } from '../notification.service';
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
  constructor(private accesService:AccesService, private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router, private formularService:FormularService, private istoricService:IstoricService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Cont sters cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log(this.token.getUser())
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    this.addRadiografieForm = new FormGroup({
      email: new FormControl(''),
      id_doctor: new FormControl('')
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
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
          this.deleteAcces();
          await new Promise(f => setTimeout(f, 2000));
          this.router.navigate(['/login']);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public removeToken():void {
    this.token.removeUser();
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
  public deleteAcces(){
    this.accesService.deleteAcces(this.currentUser.email).subscribe({
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

}
