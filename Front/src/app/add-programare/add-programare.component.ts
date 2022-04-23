import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-programare',
  templateUrl: './add-programare.component.html',
  styleUrls: ['./add-programare.component.css']
})
export class AddProgramareComponent implements OnInit {

  appointmentForm!:FormGroup
  users !: User[];
  loggedInUser!: any;
  currentUser!: any;
  submitted = false

  constructor(private appointmentService:AppointmentService, private notifyService:NotificationService, private userService:UserService, private token:TokenStorageService) { }

  showToasterSuccess(){
    this.notifyService.showSuccess("Programare înregistrată cu succes !!")
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.appointmentForm = new FormGroup({
      email_pacient: new FormControl('',Validators.required),
      data: new FormControl('', Validators.required),
      ora_incepere: new FormControl('', Validators.required),
      ora_finalizare: new FormControl('',Validators.required),
      descriere: new FormControl('', Validators.required)
    });
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    this.getUsers();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe({
      next:(response: User[]) => {
        this.users = response;
        console.log(this.users);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  async onSubmit(appointmentForm:FormGroup){
    this.submitted = true;
    if(appointmentForm.valid){
      this.appointmentService.addAppointment(appointmentForm.value).subscribe({
        next:async (response: Appointment) => {
          console.log(response);
          this.showToasterSuccess();
          await new Promise(f => setTimeout(f, 1000));
          this.appointmentForm.controls['data'].reset();
          this.appointmentForm.controls['ora_incepere'].reset();
          this.appointmentForm.controls['ora_finalizare'].reset();
          this.appointmentForm.controls['descriere'].reset();
          this.submitted = false;
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      })
    }
  }
}
