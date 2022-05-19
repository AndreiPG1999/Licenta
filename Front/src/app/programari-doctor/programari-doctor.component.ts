import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { NotificationService } from '../notification.service';
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
  neededAppointments!: Appointment[];

  constructor(private appointmentService:AppointmentService, private token:TokenStorageService, private userService:UserService, private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser()
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getAppointment();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Programare ștearsă cu succes !!")
  }

  public getAppointment(): void {
    this.appointmentService.findAppointmentById(this.loggedInUser.id).subscribe({
      next:(response: Appointment[]) => {
        this.neededAppointments = response;
        console.log(this.neededAppointments);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchProgramari(key: string) : void{
    const results: Appointment[] = [];
    for(const neededAppointment of this.neededAppointments){
      if(neededAppointment.email.toLowerCase().indexOf(key.toLowerCase()) !== -1 || neededAppointment.data.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(neededAppointment);
      }
    }
    this.neededAppointments = results;
    if(!key){
      this.getAppointment();
    }
  }
  clickMethod(id:number){
    if(confirm("Sunteți sigur că doriți să ștergeți această programare?")){
      this.appointmentService.deleteAppointment(id).subscribe({
        next: async () => {
          this.showToasterSuccess();
          window.location.reload();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }
}
