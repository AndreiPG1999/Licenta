import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularService } from '../formular.service';
import { IstoricService } from '../istoric.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarPacientComponent implements OnInit {

  currentUser!:any;
  constructor(private token: TokenStorageService, private userService:UserService, private notifyService:NotificationService, private router:Router, private formularService:FormularService, private istoricService:IstoricService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Cont sters cu succes !!")
  }
  ngOnInit(): void {
    this.currentUser = this.token.getUser();
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

  public deleteFormular(){
    this.formularService.deleteFormular(this.currentUser.email).subscribe({
    });
  }
  public deleteIstoric(){
    this.istoricService.deleteIstoric(this.currentUser.email).subscribe({
    });
  }

}
