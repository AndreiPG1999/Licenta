import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error = 'Email sau parola gresita!';
  isLoggedIn = false;
  loginForm!: FormGroup;
  submitted=false;
  user!: User;
  currentUser!: any;
  loggedInUser!: any;
  constructor(private notifyService:NotificationService, private userService:UserService, private router: Router, private authService: AuthService, private tokenStorage:TokenStorageService, private token:TokenStorageService) {}
   
  showToasterSuccess(){
    this.notifyService.showSuccess("Login successful !!")
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',Validators.required)
    });
  }
  
  onLogin(loginForm: FormGroup){
    this.submitted = true;
    if(loginForm.valid){
      this.authService.login(loginForm.value).subscribe({
        next:async (user) => {
          this.tokenStorage.saveUser(user);
          this.currentUser = this.tokenStorage.getUser();
          this.userService.findUser(this.currentUser.email).subscribe({
            next:(response: User) => {
              this.loggedInUser = response;
              console.log(this.loggedInUser);
            },
            error: (error: HttpErrorResponse) => {
              alert(error.message);
            }
          });

          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          if(this.loggedInUser.type === "pacient"){
            this.router.navigate(['/home'], {queryParams: { loggedIn: 'true' } });
          }
          else{
            this.router.navigate(['/homeD'], {queryParams: { loggedIn: 'true' } });
          }
        },
        error: () => {
          alert(this.error);
          loginForm.reset();
          this.submitted = false;
        }
      });
    }
    
    
  }
}