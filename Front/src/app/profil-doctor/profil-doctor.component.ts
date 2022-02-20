import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profil-doctor',
  templateUrl: './profil-doctor.component.html',
  styleUrls: ['./profil-doctor.component.css']
})
export class ProfilDoctorComponent implements OnInit {

  currentUser!: any;
  loggedInUser!: any;
  first_name!: string;
  last_name!: string;
  id!: number;
  constructor(private token: TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

}
