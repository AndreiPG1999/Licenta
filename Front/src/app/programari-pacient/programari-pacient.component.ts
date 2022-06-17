import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-programari-pacient',
  templateUrl: './programari-pacient.component.html',
  styleUrls: ['./programari-pacient.component.css']
})
export class ProgramariPacientComponent implements OnInit {

  currentUser!: any;
  appointments !: Appointment[];

  constructor(private appointmentService:AppointmentService, private token:TokenStorageService, private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    if(!this.currentUser.email)
      this.router.navigate(['login']);
    else{
      this.getAppointment();
    }
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

  
}
