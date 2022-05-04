import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-programari-doctor',
  templateUrl: './programari-doctor.component.html',
  styleUrls: ['./programari-doctor.component.css']
})
export class ProgramariDoctorComponent implements OnInit {

  currentUser!: any;
  appointments !: Appointment[];
  loggedInUser!: any;
  users !: User[];

  constructor(private appointmentService:AppointmentService, private token:TokenStorageService, private userService:UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    this.getAppointment();
  }

  public getAppointment(): void {
    this.appointmentService.getAppointments().subscribe({
      next:(response: Appointment[]) => {
        this.appointments = response;
        console.log(this.appointments);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
  // clickMethod(){
  //   if(confirm("Sunteți sigur că doriți să vă ștergeți contul?")){
  //     this.userService.deleteUser(this.currentUser.email).subscribe({
  //       next: async () => {
  //         this.showToasterSuccess();
  //         await new Promise(f => setTimeout(f, 2000));
  //         this.router.navigate(['/login']);
  //       },
  //       error: (error:HttpErrorResponse) => {
  //         alert(error.message);
  //       }
  //     });
  //   }
  // }
}
