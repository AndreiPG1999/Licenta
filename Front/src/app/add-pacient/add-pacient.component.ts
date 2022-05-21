import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { AppointmentService } from '../appointment.service';
import { Formular } from '../formular';
import { FormularService } from '../formular.service';
import { Istoric } from '../istoric';
import { IstoricService } from '../istoric.service';
import { NotificationService } from '../notification.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-pacient',
  templateUrl: './add-pacient.component.html',
  styleUrls: ['./add-pacient.component.css']
})
export class AddPacientComponent implements OnInit {

  public users!: User[];
  currentUser!: any;
  loggedInUser!: any;
  public neededUsers !: User[];

  constructor(private userService:UserService, private notifyService:NotificationService, private token:TokenStorageService, private appointmentService:AppointmentService, private istoricService:IstoricService, private formularService:FormularService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.userService.findUser(this.currentUser.email).subscribe({
      next:(response: User) => {
        this.loggedInUser = response;
        console.log(this.loggedInUser);
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    
  }

  public getUsers(): void {
    this.userService.findUsersByType().subscribe({
      next:(response: User[]) => {
        this.neededUsers = response;
        console.log(this.neededUsers);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public searchUsers(key: string) : void{
    const results: User[] = [];
    for(const neededUser of this.neededUsers){
      if(neededUser.last_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 || 
      neededUser.first_name.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
      neededUser.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(neededUser);
      }
    }
    this.neededUsers = results;
    if(!key){
      this.getUsers();
    }
  }
  showToasterSuccess(){
    this.notifyService.showSuccess("Pacient adaugat cu succes !!")
  }

  public onAddPacient(user:User){
    if(confirm("Sunteți sigur că doriți să vă atribuiți acest pacient?")){
      this.userService.updatePacient(user.email,this.loggedInUser.id).subscribe({
        next: (response: User) => {
          console.log(response);
          this.updateIdFormular(user);
          this.updateIdIstoric(user);
          this.updateIdAppointment(user);
          window.location.reload();
          this.showToasterSuccess();
        },
        error: (error:HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
  }

  public updateIdFormular(user:User): void{
    this.formularService.updateIdDoctor(user.email, this.loggedInUser.id).subscribe({
      next: (response: Formular) => {
        console.log(response);
      },
      error: () => {
      }
    });
  }

  public updateIdIstoric(user:User): void{
    this.istoricService.updateIdDoctor(user.email, this.loggedInUser.id).subscribe({
      next: (response: Istoric) => {
        console.log(response);
      },
      error: () => {
      }
    });
  }

  public updateIdAppointment(user:User): void{
    this.appointmentService.updateIdDoctor(user.email, this.loggedInUser.id).subscribe({
      next: (response: Appointment) => {
        console.log(response);
      },
      error: () => {
      }
    });
  }
}
