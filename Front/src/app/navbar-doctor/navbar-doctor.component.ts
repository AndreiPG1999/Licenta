import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.css']
})
export class NavbarDoctorComponent implements OnInit {

  currentUser!:any;
  addRadiografieForm !: FormGroup;
  display = "none";
  loggedInUser !: any;
  users !: User[];
  selectedFile !:File;
  constructor(private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Cont sters cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.addRadiografieForm = new FormGroup({
      email: new FormControl(''),
      id_doctor: new FormControl('')
    });
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
      this.userService.findUser(this.currentUser.email).subscribe({
        next:(response: User) => {
          this.loggedInUser = response;
          console.log(this.loggedInUser);
          this.userService.findUsersByEmail(this.loggedInUser.id).subscribe({
            next:(response: User[]) => {
              this.users = response;
              console.log(this.users);
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
  clickMethod(){
    if(confirm("Sunteți sigur că doriți să vă ștergeți contul?")){
      this.userService.deleteUser(this.currentUser.email).subscribe({
        next: async () => {
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 2000));
          this.router.navigate(['/login']);
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
  public removeToken(){
    this.token.removeUser();
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
