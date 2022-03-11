import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar-doctor',
  templateUrl: './navbar-doctor.component.html',
  styleUrls: ['./navbar-doctor.component.css']
})
export class NavbarDoctorComponent implements OnInit {

  currentUser!:any;
  constructor(private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Cont sters cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
  }
  clickMethod(){
    if(confirm("Are you sure do you want to delete the account?")){
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

}
