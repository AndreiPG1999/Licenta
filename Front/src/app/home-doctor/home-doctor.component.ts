import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home-doctor.component.html',
  styleUrls: ['./home-doctor.component.css']
})
export class HomeDoctorComponent implements OnInit {

  startIndex = 0;
  loggedInUser!: any;
  currentUser!: any;
  constructor(private token: TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.showSlides();
    this.currentUser = this.token.getUser();
    this.Repeat();
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
  Repeat(){
    setTimeout(() => {
      this.showSlides();
      this.Repeat();
    }, 2000);
  }
  showSlides(){
    const slides = Array.from(document.getElementsByClassName("mySlides"));
    if (slides === []) {
      this.Repeat();
    }
    for(const x of slides)
    {
      const y = x as HTMLElement;
      y.style.display = 'none';
    }
    if (this.startIndex > slides.length - 1) {
      this.startIndex = 0;
      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    } else {

      const slide = slides[this.startIndex] as HTMLElement;
      slide.style.display = 'block';
      this.startIndex++;
    }

  }

}

